# Testimonials Section - Dynamic Implementation

## Overview

Updated the TestimonialsSection component to display dynamic testimonials from the database using the Ulasan API, replacing the hardcoded static data.

## Changes Made

### Backend API

#### 1. **ulasan-service.js** (`backend/services/ulasan-service.js`)

- Added new `getApproved()` function to fetch only approved testimonials
- Returns testimonials with status = "APPROVED"
- Includes user and layanan (service) data
- Returns data ordered by newest first
- Exported the new function in the default export

#### 2. **ulasan-controller.js** (`backend/controllers/ulasan-controller.js`)

- Added new `getApproved()` controller method
- Handles requests to fetch approved testimonials
- Returns formatted response with success/error handling

#### 3. **public-routes.js** (`backend/routes/public-routes.js`)

- Added public API endpoint: `GET /ulasan/approved`
- Route uses ulasanController.getApproved()
- No authentication required for public access

### Frontend API Layer

#### 4. **ulasan.js** (`frontend/src/services/api/ulasan.js`)

- Added new `findApproved()` method to the ulasanApi
- Makes a GET request to `/ulasan/approved` endpoint
- No authentication headers needed (public endpoint)
- Returns approved testimonials data

### Frontend Component

#### 5. **TestimonialsSection.jsx** (`frontend/src/presentation/views/LandingComponent/TestimonialsSection.jsx`)

- Replaced static hardcoded reviews array with dynamic state
- Added three state variables:
  - `reviews`: Array of testimonials fetched from API
  - `loading`: Boolean for loading state
  - `error`: String for error messages
- Implemented `useEffect` hook to fetch data on component mount
- Data transformation from API format to component format:

  ```javascript
  {
    id: ulasan.id,
    quote: ulasan.komentar,        // testimonial comment
    name: ulasan.user?.nama,       // user name
    role: ulasan.layanan?.namaLayanan,  // service name
    rating: ulasan.rating          // rating (optional display)
  }
  ```

- Added loading state UI: Shows "Loading testimonials..." message
- Added error state UI: Shows error message or "No testimonials available yet"
- Fixed auto-advance interval to check if reviews exist before starting
- All carousel animations and interactions remain the same

## How It Works

1. **Component mounts** → useEffect triggers
2. **API call** → Fetches approved testimonials from `/ulasan/approved`
3. **Data transformation** → Maps Ulasan data to component format
4. **State update** → Sets reviews in component state
5. **Render** → Component displays testimonials or loading/error states
6. **User interaction** → Navigation, dots, and auto-play work as before

## Testing

To test the dynamic testimonials:

1. **Create approved testimonials** in the database:
   - Use POST `/ulasan` endpoint to create new reviews (requires auth)
   - Or update status field to "APPROVED" in AdminPanel for existing reviews

2. **View on landing page** → TestimonialsSection will automatically fetch and display

3. **Test cases**:
   - ✅ Loading state displays correctly
   - ✅ Testimonials appear after loading
   - ✅ Navigation and auto-play work
   - ✅ Error handling if API fails

## API Data Structure

The component expects the following data structure from the backend:

```javascript
{
  id: number,
  userId: number,
  layananId: number,
  rating: number,
  komentar: string,
  helpfulCount: number,
  status: "APPROVED" | "PENDING" | "REJECTED",
  createdAt: DateTime,
  updatedAt: DateTime,
  user: {
    id: number,
    nama: string,
    email: string,
    ...
  },
  layanan: {
    id: number,
    namaLayanan: string,
    ...
  }
}
```

## Benefits

✅ **Dynamic content** - Testimonials update without code changes
✅ **Admin control** - Approve/reject testimonials via admin panel
✅ **Real user data** - Display actual customer reviews and feedback
✅ **Scalable** - Works with any number of testimonials
✅ **Better UX** - Shows loading states and handles errors gracefully
✅ **Consistent with existing API patterns** - Follows same service/controller/route structure
