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
        }
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
        path: 'manage-product',
        Component: ManageProduct,
      },
    ]

  }
]);


export default router;