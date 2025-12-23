import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";

const DashboardIndex = () => {
    const { role, loading } = useContext(AuthContext);

    // ডাটা লোড হওয়ার সময় একটি লোডিং স্পিনার বা টেক্সট দেখানো জরুরি
    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
            </div>
        );
    }

    // এডমিন বা ভলান্টিয়ার হলে Admin Home এ পাঠাবে
    if (role === "admin" || role === "volunteer") {
        return <Navigate to="/dashboard/admin-home" replace />;
    }

    // সাধারণ ডোনার হলে সরাসরি Main Dashboard (Status overview) দেখাবে
    return <MainDashboard />;
};

export default DashboardIndex;