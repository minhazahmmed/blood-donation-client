import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router"; 
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PiHandWaving } from "react-icons/pi";
import { 
    ClipboardDocumentListIcon, 
    ClockIcon, 
    CheckCircleIcon, 
    DocumentPlusIcon 
} from "@heroicons/react/24/outline";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const VolunteerHome = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure.get("/volunteer-stats")
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [axiosSecure]);

    if (loading) return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-red-700"></span>
        </div>
    );

    const chartData = [
        { name: 'Pending', value: stats?.pendingRequests || 0 },
        { name: 'Completed', value: stats?.doneRequests || 0 },
    ];
    const COLORS = ['#FBBF24', '#15803D']; 

    const cards = [
        { id: 1, name: "Total Requests", value: stats?.totalRequests, icon: <ClipboardDocumentListIcon className="h-8 w-8 text-blue-700"/>, bg: "bg-blue-50", border: "border-blue-100" },
        { id: 2, name: "Pending Requests", value: stats?.pendingRequests, icon: <ClockIcon className="h-8 w-8 text-yellow-700"/>, bg: "bg-yellow-50", border: "border-yellow-100" },
        { id: 3, name: "Donations Done", value: stats?.doneRequests, icon: <CheckCircleIcon className="h-8 w-8 text-green-700"/>, bg: "bg-green-50", border: "border-green-100" },
        { id: 4, name: "My Draft Blogs", value: stats?.myDraftBlogs, icon: <DocumentPlusIcon className="h-8 w-8 text-purple-700"/>, bg: "bg-purple-50", border: "border-purple-100" },
    ];

    return (
        <div className="p-4 sm:p-6 font-['Inter'] bg-slate-50 min-h-screen text-slate-700">
            {/* Welcome Section */}
            <div className="mb-8 bg-white p-6 sm:p-10 rounded-[2rem] shadow-sm border border-red-50 relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-slate-800 tracking-tight">
                        Welcome back, <span className="text-red-700">{user?.displayName}</span>! <PiHandWaving className="text-yellow-800" />
                    </h1>
                    <div className="mt-4 flex items-center gap-2">
                        <span className="text-slate-500 font-medium">Logged in as:</span>
                        <span className="bg-red-50 text-red-700 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border border-red-100">
                            {user?.role || "Volunteer"}
                        </span>
                    </div>
                </div>
                <div className="absolute -right-10 -top-10 h-40 w-40 bg-red-50 rounded-full blur-3xl opacity-60"></div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Side: Stats Cards */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {cards.map((card) => (
                        <div key={card.id} className={`${card.bg} ${card.border} p-8 rounded-[2rem] border shadow-sm hover:shadow-md transition-all group`}>
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                                    {card.icon}
                                </div>
                            </div>
                            <h3 className="text-4xl font-semibold text-slate-800 tracking-tight">{card.value}</h3>
                            <p className="text-slate-500 font-semibold text-sm uppercase tracking-widest mt-2">{card.name}</p>
                        </div>
                    ))}
                </div>

                {/* Right Side: Recharts Visual */}
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center">
                    <h4 className="text-lg font-semibold text-slate-800 mb-6">Requests Status Breakdown</h4>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px', fontWeight: '500' }}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Quick Action Banner with Linear Gradient */}
            <div className="mt-10 p-8 sm:p-12 bg-gradient-to-r from-red-700 via-red-600 to-red-700 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-red-200/50 border border-red-500/20">
                <div className="text-center md:text-left">
                    <h4 className="text-2xl sm:text-3xl font-semibold tracking-tight">Ready to make a difference?</h4>
                    <p className="opacity-90 font-medium text-base sm:text-lg mt-2">
                        Review and manage the latest blood donation requests.
                    </p>
                </div>
                <button 
                    onClick={() => navigate("/dashboard/all-donation-requests")}
                    className="bg-white/10 hover:bg-white text-white hover:text-red-700 px-10 py-4 rounded-2xl font-semibold text-lg border-2 border-white/30 hover:border-white shadow-lg active:scale-95 transition-all duration-300 w-full md:w-auto uppercase tracking-wide backdrop-blur-sm"
                >
                    View Requests
                </button>
            </div>
        </div>
    );
};

export default VolunteerHome;