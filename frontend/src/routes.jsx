import { createBrowserRouter } from "react-router-dom";
// import Layout from '@/layouts/Layout'
import React from "react";
// import withLenis from "@/presentation/views/withLenis";
import authMiddleware, {
  redirectMiddleware,
} from "./middleware/AuthMiddleware";
import { ProgressBarIndicator } from "./middleware/ProgressBarIndicator";
import HomePage from "./presentation/views/home/HomePage";
import Login from "./presentation/views/home/Login";
import SignupPage from "./presentation/views/home/SignUp";
import ProfileUserPage from "./presentation/views/app/dashboard/component/ProfileUser";
// import DahsboardPage from "./presentation/views/app/dashboard/component/DashboardPage";
// import { DashboardLayout } from "@/presentation/views/dashboard/Layout/DashboardLayout";
// import { Dashboard } from "@/presentation/views/dashboard/Pages/Dashboard";
// import { Orders } from "@/presentation/views/dashboard/Pages/Orders";
// import { Products } from "@/presentation/views/dashboard/Pages/Products";
// import { Settings } from "@/presentation/views/dashboard/Pages/Settings";
// import { Customers } from "@/presentation/views/dashboard/Pages/Customers";

const routesConfig = {
  future: {
    unstable_middleware: true,
  },
};

const Layout = React.lazy(() => import("@/layouts/DashboardLayout"));

const NotFound = React.lazy(() => import("@/presentation/views/NotFound"));

const DashboardLayout = React.lazy(
  () => import("@/presentation/views/dashboard/Layout/DashboardLayout"),
);
const DashboardPage = React.lazy(
  () => import("@/presentation/views/app/dashboard/component/DashboardPage"),
);
const ProjectPage = React.lazy(
  () => import("@/presentation/views/app/dashboard/component/ProjectPage"),
);
const SprintPage = React.lazy(
  () => import("@/presentation/views/app/dashboard/component/SprintPage"),
);
const ProjectOverViewPage = React.lazy(
  () =>
    import("@/presentation/views/app/dashboard/component/ProjectOverviewPage"),
);
const TaskPage = React.lazy(
  () => import("@/presentation/views/app/dashboard/component/TaskPage"),
);
const WorkspacePage = React.lazy(
  () => import("@/presentation/views/app/dashboard/component/WorkspacePage"),
);
const Orders = React.lazy(
  () => import("@/presentation/views/dashboard/Pages/Orders"),
);
const Products = React.lazy(
  () => import("@/presentation/views/dashboard/Pages/Products"),
);
const Customers = React.lazy(
  () => import("@/presentation/views/dashboard/Pages/Customers"),
);
const Settings = React.lazy(
  () => import("@/presentation/views/dashboard/Pages/Settings"),
);

//#endregion Pages
const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
      // children: [
      //   { path: "/", element: <Dashboard /> },
      //   { path: "/orders", element: <Orders /> },
      //   { path: "/products", element: <Products /> },
      //   { path: "/customers", element: <Customers /> },
      //   { path: "/settings", element: <Settings /> },
      // ],
    },
    {
      path: "/login",
      element: <Login />,
      loader: redirectMiddleware,
    },
    {
      path: "/signup",
      element: <SignupPage />,
      loader: redirectMiddleware,
    },

    // {
    //   path: "/app",
    //   // Component: Layout,
    //   loader: authMiddleware,
    //   unstable_middleware: [ProgressBarIndicator],
    //   children: [
    //     {
    //       index: true,
    //       Component: Dashboard,
    //     },
    //     {
    //       path: "/app/orders",
    //       Component: Orders,
    //     },
    //   ],
    // },
    {
      path: "/app",
      Component: Layout,
      loader: authMiddleware,
      unstable_middleware: [ProgressBarIndicator],
      children: [
        {
          index: true,
          Component: DashboardPage,
        },
        {
          path: "/app/projects",
          Component: ProjectPage,
        },
        {
          path: "/app/sprint",
          Component: SprintPage,
        },
        {
          path: "/app/project/overview",
          Component: ProjectOverViewPage,
        },
        {
          path: "/app/task",
          Component: TaskPage,
        },
        {
          path: "/app/workspace/members",
          Component: WorkspacePage,
        },
        {
          path: "/app/settings/profile",
          Component: ProfileUserPage,
        },
      ],
    },
    {
      path: "*",
      Component: NotFound,
    },
  ],
  routesConfig,
);

export default routes;
