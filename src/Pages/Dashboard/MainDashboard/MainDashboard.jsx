import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MainDashboard = () => {
    const { user } = useContext(AuthContext);
    const [recentRequests, setRecentRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/my-requests-recent`).then(res => setRecentRequests(res.data));
    }, [axiosSecure]);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-0">
            <div className="mb-6 sm:mb-10 font-[Inter]">
                <h1 className="text-2xl sm:text-4xl font-semibold text-slate-800 tracking-tight">
                    Welcome, <span className="text-red-700 uppercase">{user?.displayName}</span>!
                </h1>
                <p className="text-slate-400 text-sm sm:text-base font-medium mt-1">Here is a quick overview of your blood donation activity.</p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 sm:p-8 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-gray-50/50">
                    <h3 className="font-bold text-lg sm:text-xl text-slate-800">Recent Requests</h3>
                    <Link to="/dashboard/my-request" className="text-red-700 text-xs sm:text-[15px] font-semibold uppercase tracking-tighter hover:underline ">View All Requests</Link>
                </div>

                {/* Horizontal Scroll Wrapper */}
                <div className="overflow-x-auto p-2 sm:p-4">
                    {/* min-w-[600px] নিশ্চিত করবে যে মোবাইলে কলামগুলো গাদাগাদি হবে না */}
                    <table className="table w-full border-separate border-spacing-y-2 min-w-[600px]">
                        <thead>
                            <tr className="text-slate-600 border-none">
                                <th className="bg-transparent text-[14px] sm:text-[16px]">Recipient</th>
                                <th className="bg-transparent text-[14px] sm:text-[16px]">Location</th>
                                <th className="bg-transparent text-[14px] sm:text-[16px]">Status</th>
                                <th className="bg-transparent text-[14px] sm:text-[16px]">Actions</th>
                            </tr>
                        </thead>
                      <tbody>
    {recentRequests.map(req => (
        <tr key={req._id} className="bg-white shadow-sm rounded-xl sm:rounded-3xl hover:bg-red-50/20 transition-colors">
            <td className="py-3 sm:py-4 px-3 sm:px-6">
              
                <span className="font-bold text-slate-700 text-[13px] sm:text-[14px] block">
                    {req.recipientName}
                </span>
                <span className="text-red-500 text-[10px] sm:text-xs font-semibold">
                    {req.bloodGroup}
                </span>
            </td>
            <td className="text-slate-500 font-medium text-[13px] sm:text-[14px]">
                {req.recipient_upazila}, {req.recipient_district}
            </td>
            <td>
                <span className={`px-3 sm:px-4 py-1 rounded-full text-[10px] sm:text-[12px] uppercase font-semibold ${
                    req.donation_status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                }`}>
                    {req.donation_status}
                </span>
            </td>
            <td>
                <Link to={`/dashboard/request-details/${req._id}`} className="btn btn-ghost btn-xs sm:btn-sm text-red-700 uppercase underline font-semibold">Details</Link>
            </td>
        </tr>
    ))}
</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MainDashboard;