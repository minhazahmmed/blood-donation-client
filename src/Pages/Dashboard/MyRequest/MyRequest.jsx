import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyRequest = () => {
    const [totalRequest, setTotalRequest] = useState(0);
    const [myRequests, setMyRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemPerPage}`)
            .then((res) => {
                setMyRequests(res.data.request);
                setTotalRequest(res.data.totalRequest);
            });
    }, [currentPage, axiosSecure]);

    const totalPages = Math.ceil(totalRequest / itemPerPage);
    const pages = [...Array(totalPages).keys()].map(n => n + 1);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-0 font-['Inter',sans-serif]">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-6 sm:mb-8 tracking-tight">
                My <span className="text-red-700">Requests</span>
            </h2>
            
            {/* Table Container with Horizontal Scroll */}
            <div className="bg-white rounded-2xl sm:rounded-[40px] shadow-sm border border-gray-100 mb-8 sm:mb-10 overflow-hidden">
                <div className="overflow-x-auto">
                   
                    <table className="table w-full min-w-[700px]"> 
                        <thead className="bg-gray-50/50">
                            <tr className="text-slate-600 uppercase text-[13px] sm:text-[15px] font-bold tracking-widest">
                                <th className="py-4 sm:py-6 px-4 sm:px-8">Recipient</th>
                                <th>Hospital</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
<tbody>
    {myRequests.map((req) => (
        <tr key={req._id} className="border-b border-gray-50 hover:bg-red-50/30 transition-colors text-[13px] sm:text-[15px]">
            <td className="py-4 sm:py-5 px-4 sm:px-8">
                <span className="font-bold text-slate-700 block">{req.recipientName}</span>
                <span className="text-red-500 text-[10px] sm:text-xs font-semibold">{req.bloodGroup}</span>
            </td>
            <td className="text-slate-600 font-medium">{req.hospitalName}</td>
            <td className="font-bold text-slate-600">{req.donationDate}</td>
            <td>
                {/* ক্যাটাগরি অনুযায়ী ডাইনামিক কালার লজিক */}
                <span className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase ${
                    req.donation_status === 'pending' ? 'bg-amber-100 text-amber-600' : 
                    req.donation_status === 'inprogress' ? 'bg-blue-100 text-blue-600' : 
                    req.donation_status === 'done' ? 'bg-green-100 text-green-600' : 
                    req.donation_status === 'canceled' ? 'bg-rose-100 text-rose-600' : 
                    'bg-gray-100 text-gray-600'
                }`}>
                    {req.donation_status}
                </span>
            </td>
            <td>
                <button className="btn btn-ghost btn-xs sm:btn-sm text-red-700 font-semibold hover:bg-red-100 rounded-lg">EDIT</button>
            </td>
        </tr>
    ))}
</tbody>
                    </table>
                </div>
            </div>

            {/* Pagination remains same */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 pb-10">
                <button 
                    onClick={handlePrev} 
                    disabled={currentPage === 1}
                    className="btn btn-xs sm:btn-sm btn-outline border-gray-200 text-slate-600 hover:bg-red-600 hover:border-red-600 hover:text-white disabled:opacity-30 rounded-xl px-3 sm:px-4"
                >
                    Prev
                </button>
                
                <div className="flex gap-1 sm:gap-2">
                    {pages.map((page) => (
                        <button 
                            key={page} 
                            onClick={() => setCurrentPage(page)} 
                            className={`btn btn-xs sm:btn-sm btn-circle border-none font-bold transition-all ${
                                currentPage === page ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-white shadow-sm text-slate-600 hover:bg-red-50'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button 
                    onClick={handleNext} 
                    disabled={currentPage === totalPages}
                    className="btn btn-xs sm:btn-sm btn-outline border-gray-200 text-slate-600 hover:bg-red-600 hover:border-red-600 hover:text-white disabled:opacity-30 rounded-xl px-3 sm:px-4"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyRequest;