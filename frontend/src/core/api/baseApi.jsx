import globalRouter from "@/helpers/GlobalNavigate";
import SecureStorage from "@/helpers/SecureStorage";
import axios from "axios";

// Flag to track if we're refreshing the token
let isRefreshing = false;
let currentRefreshCount = 0;
// Queue of requests to retry after token refresh
let failedQueue = [];
// Maximum number of retry attempts for a request
const MAX_RETRY_ATTEMPTS = 3;

const clearAuthSession = () => {
  SecureStorage.removeStorage("token");
  SecureStorage.removeStorage("user");
  globalRouter.navigate("/login", { replace: true });
};

const decodeJwtPayload = (token) => {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length < 2) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    const decoded = atob(padded);
    return JSON.parse(
      decodeURIComponent(
        decoded
          .split("")
          .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(""),
      ),
    );
  } catch (error) {
    console.error("Failed to decode JWT payload:", error);
    return null;
  }
};

const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = decodeJwtPayload(token);
  if (!payload || typeof payload.exp !== "number") {
    return false;
  }

  return Date.now() >= payload.exp * 1000;
};

// Process the queue of failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const getRefreshToken = async () => {
  try {
    const token = SecureStorage.getStorage("token");

    const remoteResponse = await baseApi.post("/refresh-token", null, {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    });
    const responseData = remoteResponse.data;
    const accessToken =
      responseData?.data?.accessToken || responseData?.accessToken;

    if (!accessToken) {
      throw new Error("Refresh token response did not include accessToken");
    }

    return accessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    currentRefreshCount += 1;
    throw error;
  }
};

const requestInterceptor = (config) => {
  // Track retry count in headers
  const retryCount = parseInt(config.headers["retry-count"] || 0);
  config.headers["retry-count"] = retryCount;

  if (config.headers["require-auth"]) {
    const token = SecureStorage.getStorage("token");
    console.log("Token from SecureStorage:", token);

    if (!token || isTokenExpired(token)) {
      clearAuthSession();
      return Promise.reject(new Error("Token expired or missing"));
    }

    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

const responseErrorInterceptor = async (error) => {
  const originalRequest = error.config;

  // Only retry if status is 401 and we haven't exceeded MAX_RETRY_ATTEMPTS
  if (
    error.response?.status === 401 &&
    currentRefreshCount < MAX_RETRY_ATTEMPTS
  ) {
    currentRefreshCount += 1;
    // Increment retry count for this request
    originalRequest.headers["retry-count"] = currentRefreshCount + 1;
    console.log(
      `Retry attempt ${currentRefreshCount + 1}/${MAX_RETRY_ATTEMPTS} for:`,
      originalRequest.url,
    );

    if (isRefreshing) {
      console.log(
        "Token is being refreshed, adding to queue:",
        originalRequest.url,
      );
      // If we're already refreshing, add this request to the queue
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          return baseApi(originalRequest);
        })
        .catch((err) => Promise.reject(err))
        .finally(() => {
          isRefreshing = false;
        });
    }

    isRefreshing = true;

    const token = SecureStorage.getStorage("token");
    if (!token || isTokenExpired(token)) {
      isRefreshing = false;
      clearAuthSession();
      return Promise.reject(new Error("Token expired or missing"));
    }

    try {
      console.log("Starting token refresh process...");
      baseApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      baseApi.defaults.headers.common["x-api-key"] = "valid-api-key";

      if (currentRefreshCount >= MAX_RETRY_ATTEMPTS) {
        console.log(
          `Maximum refresh attempts reached (${MAX_RETRY_ATTEMPTS}), redirecting to login...`,
        );
        SecureStorage.removeStorage("token");
        console.log("GlobalRouter redirecting to login...");
        console.log(globalRouter);
        globalRouter.navigate("/login", { replace: true });
      }

      const newToken = await getRefreshToken();
      console.log("Token refreshed successfully:", newToken);
      SecureStorage.setStorage("token", newToken);

      // Update authorization header
      baseApi.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

      // Process any queued requests
      processQueue(null, newToken);
      isRefreshing = false;

      // Retry the original request with new token
      return baseApi(originalRequest);
    } catch (refreshError) {
      // If refresh token fails
      processQueue(refreshError);
      isRefreshing = false;

      // Clear auth data and redirect to login
      // SecureStorage.removeStorage('token')
      if (currentRefreshCount >= MAX_RETRY_ATTEMPTS) {
        currentRefreshCount = 0;
        return globalRouter.navigate("/login", { replace: true });
      }
      currentRefreshCount += 1;
      console.log("Current refresh count:", currentRefreshCount);
    } finally {
      // isRefreshing = false
    }
  }

  // If we've exceeded max retries or it's not a 401 error
  if (
    error.response?.status === 401 &&
    currentRefreshCount >= MAX_RETRY_ATTEMPTS
  ) {
    console.log(
      `Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) reached for:`,
      originalRequest.url,
    );
    // Clear token and redirect to login
    SecureStorage.removeStorage("token");
    SecureStorage.removeStorage("user");
    console.log("GlobalRouter redirecting to login...");
    globalRouter.navigate("/login", { replace: true });
    if (currentRefreshCount >= MAX_RETRY_ATTEMPTS) {
      currentRefreshCount = 0;
    }
  }

  // For other errors, just reject
  return Promise.reject(error);
};

const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("API URL:", import.meta.env.VITE_API_URL);

baseApi.interceptors.request.use(requestInterceptor, (error) => {
  return Promise.reject(error);
});

baseApi.interceptors.response.use(
  (response) => response,
  responseErrorInterceptor,
);

export default baseApi;
