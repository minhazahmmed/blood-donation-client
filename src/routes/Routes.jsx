import { createBrowserRouter, Navigate } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayout from "../Dashboard Layout/DashBoardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
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
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

// রিডাইরেকশন কম্পোনেন্ট
const DashboardIndex = () => {
    const { role, loading } = useContext(AuthContext);
    if (loading) return null; 
    return role === "admin" ? <Navigate to="/dashboard/admin-home" replace /> : <MainDashboard />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", Component: Home },
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Donate />
          </PrivateRoute>
        ),
      },
      { path: "/payment-success", Component: PaymentSuccess },
      { path: "/payment-cancelled", Component: PaymentCancelled },
      { path: "/search", Component: SearchRequest },
      {
        path: "/request-details/:id",
        element: (
          <PrivateRoute>
            <RequestDetails />
          </PrivateRoute>
        ),
      },
      { path: "/donation-requests", Component: DonationRequests },
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
      {
        index: true, 
        element: <DashboardIndex />, // রোল অনুযায়ী ডাইনামিক রিডাইরেক্ট
      },
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "all-donation-requests",
        element: <AllDonationRequests />,
      },
      {
        path: "add-request",
        Component: AddRequest,
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "my-request",
        Component: MyRequest,
      },
      {
        path: "profile",
        Component: UpdateProfile,
      },
    ],
  },
]);

export default router;