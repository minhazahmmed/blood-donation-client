import { createBrowserRouter, Outlet } from "react-router";

import Home from "../Pages/Home/Home";
import RootLayout from "../RootLayout/RootLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLayout from "../Dashboard Layout/DashBoardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";

import ManageProduct from "../Pages/Dashboard/ManageProduct/ManageProduct";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import Donate from "../Pages/Donate/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/PaymentCancelled/PaymentCancelled";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
        {
            path: '/',
            Component: Home,
        },
        {
          path: '/login',
          Component: Login,
        },
        {
          path: '/register',
          Component: Register,
        },
        {
          path: '/donate',
          Component: Donate,
        },
        {
          path: '/payment-success',
          Component: PaymentSuccess,
        },
        {
          path: '/payment-cancelled',
          Component: PaymentCancelled,
        },
    ]
  },

  {
    path: 'dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children:
    [
      {
        path: '/dashboard',
        Component: MainDashboard,
      },
      {
        path: 'add-request',
        Component: AddRequest,
      },
      {
        path: 'all-users',
        Component: AllUsers,
      },
      {
        path: 'my-request',
        Component: MyRequest,
      },
    ]

  }
]);


export default router;