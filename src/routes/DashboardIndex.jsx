import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";

const DashboardIndex = () => {
    const { role, loading } = useContext(AuthContext);

 
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    if (role === "admin") {
        return <Navigate to="/dashboard/admin-home" replace />;
    }

  
    if (role === "volunteer") {
        return <Navigate to="/dashboard/volunteer-home" replace />;
    }


    return <MainDashboard />;
};

export default DashboardIndex;