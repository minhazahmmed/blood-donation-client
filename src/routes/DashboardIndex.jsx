import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";

const DashboardIndex = () => {
    const { role, loading } = useContext(AuthContext);

    // ডাটা লোড হওয়ার সময় একটি লোডিং স্পিনার দেখানো হচ্ছে
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    // এডমিন হলে Admin Home এ পাঠাবে
    if (role === "admin") {
        return <Navigate to="/dashboard/admin-home" replace />;
    }

    // ভলান্টিয়ার হলে Volunteer Home এ পাঠাবে (নতুন আপডেট)
    if (role === "volunteer") {
        return <Navigate to="/dashboard/volunteer-home" replace />;
    }

    // সাধারণ ডোনার হলে সরাসরি Main Dashboard (Status overview) দেখাবে
    return <MainDashboard />;
};

export default DashboardIndex;