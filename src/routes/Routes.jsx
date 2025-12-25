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
import ContentManagement from "../Pages/Dashboard/ContentManagement/ContentManagement"; // New
import AddBlog from "../Pages/Dashboard/ContentManagement/AddBlog"; // New

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
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
      { path: "all-donation-requests", element: <AllDonationRequests /> },
      { path: "add-request", element: <AddRequest /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "my-request", element: <MyRequest /> },
      { path: "profile", element: <UpdateProfile /> },
      // --- Admin/Volunteer Content Management Routes ---
      { path: "content-management", element: <ContentManagement /> },
      { path: "content-management/add-blog", element: <AddBlog /> },
    ],
  },
]);

export default router;