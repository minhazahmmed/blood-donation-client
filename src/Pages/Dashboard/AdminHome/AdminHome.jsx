import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUsers, FaFolderOpen, FaHandHoldingUsd } from 'react-icons/fa';

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({ totalUsers: 0, totalRequests: 0, totalFunding: 0 });

    useEffect(() => {
        axiosSecure.get('/admin-stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-700 mb-6">Welcome to Admin Dashboard</h2>
            
            {/* Statistics Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Total Donors */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-red-500 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium uppercase">Total Donors</p>
                        <h3 className="text-3xl font-bold text-gray-800">{stats.totalUsers}</h3>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full text-red-500 text-2xl">
                        <FaUsers />
                    </div>
                </div>

                {/* Total Requests */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium uppercase">Total Requests</p>
                        <h3 className="text-3xl font-bold text-gray-800">{stats.totalRequests}</h3>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full text-blue-500 text-2xl">
                        <FaFolderOpen />
                    </div>
                </div>

                {/* Total Funding */}
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500 font-medium uppercase">Total Funding</p>
                        <h3 className="text-3xl font-bold text-gray-800">${stats.totalFunding}</h3>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full text-green-500 text-2xl">
                        <FaHandHoldingUsd />
                    </div>
                </div>
            </div>

            {/* আপনি চাইলে নিচে ছোট করে একটি চার্ট বা রিসেন্ট অ্যাক্টিভিটি রাখতে পারেন */}
        </div>
    );
};

export default AdminHome;