import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers, FaFolderOpen, FaHandHoldingUsd } from 'react-icons/fa';
import CountUp from 'react-countup'; 
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    AreaChart, Area 
} from 'recharts';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({ totalUsers: 0, totalRequests: 0, totalFunding: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axiosSecure.get('/admin-stats')
            .then(res => {
                setStats(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, [axiosSecure]);

    const chartData = [
        { name: 'Donors', count: stats.totalUsers || 0, fill: '#ef4444' },
        { name: 'Requests', count: stats.totalRequests || 0, fill: '#3b82f6' },
        { name: 'Funding', count: (stats.totalFunding / 100) || 0, fill: '#22c55e' },
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <span className="loading loading-bars loading-xl text-red-600"></span>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50/50 min-h-screen font-['Inter',sans-serif]">
            <h2 className="text-3xl font-bold text-slate-800 mb-8 tracking-tight">
                Welcome back, <span className="text-red-600">Admin</span>
            </h2>
            
            {/* Statistics Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Total Donors */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Donors</p>
                        <h3 className="text-3xl font-extrabold text-slate-800 mt-1">
                            <CountUp start={0} end={stats.totalUsers} duration={3} delay={0}>
                                {({ countUpRef }) => <span ref={countUpRef} />}
                            </CountUp>
                        </h3>
                    </div>
                    <div className="bg-red-50 p-4 rounded-2xl text-red-500 text-2xl">
                        <FaUsers />
                    </div>
                </div>

                {/* Total Requests */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Requests</p>
                        <h3 className="text-3xl font-extrabold text-slate-800 mt-1">
                            <CountUp start={0} end={stats.totalRequests} duration={3} delay={0}>
                                {({ countUpRef }) => <span ref={countUpRef} />}
                            </CountUp>
                        </h3>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-2xl text-blue-500 text-2xl">
                        <FaFolderOpen />
                    </div>
                </div>

                {/* Total Funding */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Funding</p>
                        <h3 className="text-3xl font-extrabold text-slate-800 mt-1">
                            $<CountUp start={0} end={stats.totalFunding} duration={3} separator="," />
                        </h3>
                    </div>
                    <div className="bg-green-50 p-4 rounded-2xl text-green-500 text-2xl">
                        <FaHandHoldingUsd />
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100">
                    <h4 className="text-lg font-bold text-slate-700 mb-6">Overview Statistics</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} />
                                <Bar 
                                    dataKey="count" 
                                    radius={[10, 10, 10, 10]} 
                                    barSize={40}
                                    animationDuration={1500}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Area Chart */}
                <div className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100">
                    <h4 className="text-lg font-bold text-slate-700 mb-6">Activity Growth</h4>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" hide />
                                <Tooltip contentStyle={{borderRadius: '12px'}} />
                                <Area 
                                    type="monotone" 
                                    dataKey="count" 
                                    stroke="#ef4444" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorCount)" 
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;