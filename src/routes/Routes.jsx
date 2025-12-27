import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayout from "../Dashboard Layout/DashBoardLayout";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/PaymentCancelled/PaymentCancelled";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import RequestDetails from "../Pages/RequestDetails/RequestDetails";
import UpdateProfile from "../Pages/UpdateProfile/UpdateProfile";
import AllDonationRequests from "../Pages/Dashboard/AllDonationRequests/AllDonationRequests";
import DashboardIndex from "./DashboardIndex";
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement"; 
import AddBlog from "../Pages/Dashboard/ContentManagement/AddBlog"; 
import Blogs from "../Pages/Blogs/Blogs";
import VolunteerHome from "../Pages/Dashboard/VolunteerHome/VolunteerHome";
import UpdateDonationRequest from "../Pages/DonationRequests/UpdateDonationRequest";
import UpdateUserRequest from "../Pages/Dashboard/UpdateUserRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/blogs", element: <Blogs /> }, 
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Donate />
          </PrivateRoute>
        ),
      },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/payment-cancelled", element: <PaymentCancelled /> },
      { path: "/search", element: <SearchRequest /> },
      {
        path: "/request-details/:id",
        element: (
          <PrivateRoute>
            <RequestDetails />
          </PrivateRoute>
        ),
      },
      { path: "/donation-requests", element: <DonationRequests /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardIndex /> }, 
      { path: "admin-home", element: <AdminHome /> },
      { path: "volunteer-home", element: <VolunteerHome /> },
      { path: "all-donation-requests", element: <AllDonationRequests /> },
      { path: "add-request", element: <AddRequest /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "my-request", element: <MyRequest /> },
      { path: "profile", element: <UpdateProfile /> },
      { path: "content-management", element: <ContentManagement /> },
      { path: "content-management/add-blog", element: <AddBlog /> },
      {
        path: "update-my-request/:id",
        element: <UpdateUserRequest />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/request/${params.id}`) 
     
      },
{
  path: "update-request/:id",
  element: <UpdateDonationRequest />,
  loader: async ({ params }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/request/${params.id}`);
    const data = await res.json();
    console.log("Loader Data:", data); // এটি চেক করবেন কনসোলে
    return data;
  }
}
    ],
  },
]);

export default router;