/* eslint-disable no-irregular-whitespace */
import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({children}) => {
  const {user, loading, roleLoading, userStatus} = useContext(AuthContext);
const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <span className="loading loading-bars loading-xl text-red-700"></span>
      </div>
    );
  }

  if(!user || userStatus !== 'active'){
    return <Navigate to={'/login'} state={{ from: location }} replace></Navigate>
  }
  return children;
};

export default PrivateRoute;
