import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { FaLocationDot } from "react-icons/fa6";
import { FcAlarmClock } from "react-icons/fc";
import useAxios from '../../hooks/useAxios';

const DonationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxios();

    useEffect(() => {
        
        axiosPublic.get('/all-pending-requests')
            .then(res => {
                setRequests(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [axiosPublic]);

    if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-bars loading-lg text-red-700"></span></div>;

    const formatTime = (timeStr) => {
  if (!timeStr) return "N/A";
  

  const [hours, minutes] = timeStr.split(':');
  let h = parseInt(hours);
  const m = minutes;
  const ampm = h >= 12 ? 'PM' : 'AM';
  
  h = h % 12;
  h = h ? h : 12;
  
  return `${h}:${m} ${ampm}`;
};

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Pending <span className="text-red-700 ">Donation Requests</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Heroism is in your blood. Browse the requests below and help someone in their critical time.
                    </p>
                    <div className="h-1.5 w-20 bg-red-700 mx-auto mt-6 rounded-full"></div>
                </div>

                {requests.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                        <p className="text-xl text-gray-500 font-medium">No pending donation requests at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {requests.map((request) => (
                            <div key={request._id} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="bg-red-50 text-red-700 font-bold px-4 py-1 rounded-full text-md">
                                        {request.bloodGroup || request.blood}
                                    </div>
                                    <div className="text-right text-xs text-gray-400 font-bold uppercase tracking-widest">
                                        {request.donationDate}
                                    </div>
                                </div>
                                
                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-700 transition-colors">
                                    Recipient: {request.recipientName}
                                </h3>
                                
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <span className="text-lg"><FaLocationDot className="text-red-700" /></span>
                                        <span className="text-sm font-medium">{request.recipient_district}, {request.recipient_upazila}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <span className="text-lg"><FcAlarmClock /></span>
                                        <span className="text-sm font-medium">{formatTime(request.donationTime)}</span>
                                    </div>
                                </div>

                                <Link 
                                    to={`/request-details/${request._id}`}
                                    className="block w-full text-center py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-red-700 transition-all active:scale-95 shadow-lg"
                                >
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationRequests;