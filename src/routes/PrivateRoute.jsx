import React, { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate } from "react-router";

const PrivateRoute = ({children}) => {
  const {user, loading, roleLoading, userStatus} = useContext(AuthContext);

  if (loading || roleLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  if(!user || userStatus !== 'active'){
    return <Navigate to={'/login'}></Navigate>
  }
  return children;
};

export default PrivateRoute;
