import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { FaLocationDot } from 'react-icons/fa6';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RequestDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [request, setRequest] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
       
        axiosSecure.get(`/request/${id}`)
            .then(res => setRequest(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure, id]);

 const handleDonate = async (e) => {
    e.preventDefault();
    
    const updateInfo = {
        donorName: user?.displayName,
        donorEmail: user?.email,
        status: 'inprogress' 
    };

    try {
       
        const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/requests/donate/${id}`, 
            updateInfo,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}` 
                }
            }
        );

        if (response.data.modifiedCount > 0) {
            Swal.fire({
                title: "Confirmed!",
                text: "You are donating for this request.",
                icon: "success",
                confirmButtonColor: "#d33",
            });

 
            document.getElementById('donate-modal').close();
          
            window.location.reload(); 
        }
    } catch (error) {
        console.error("Update Error:", error);
        Swal.fire("Error!", "Something went wrong. Please try again.", "error");
    }
};




    if (!request) return <div className="text-center py-20"><span className="loading loading-spinner text-red-600"></span></div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-10 text-white">
                    <div className="flex justify-between items-center mb-6">
                        <span className="bg-red-600 px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase">
                            {request.bloodGroup} Required
                        </span>
                        <span className="text-slate-400 font-medium italic">Status: {request.donation_status}</span>
                    </div>
                    <h2 className="text-4xl font-extrabold mb-2">Request for {request.recipientName}</h2>
                    <p className="text-slate-300 flex items-center gap-2 ">
                        <FaLocationDot className='text-red-500' /> {request.fullAddress}, {request.recipient_upazila}, {request.recipient_district}
                    </p>
                </div>

                {/* Details Grid */}
                <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Recipient Information</h3>
                        <div className="space-y-4">
                            <p className="text-gray-600"><span className="font-bold text-slate-800">Hospital:</span> {request.hospitalName}</p>
                            <p className="text-gray-600"><span className="font-bold text-slate-800">Date:</span> {request.donationDate}</p>
                            <p className="text-gray-600"><span className="font-bold text-slate-800">Time:</span> {request.donationTime}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Requester Message</h3>
                        <p className="text-gray-600 italic leading-relaxed">"{request.requestMessage}"</p>
                        <p className="text-sm text-gray-400 mt-4 italic">— Requested by {request.requester_name}</p>
                    </div>
                </div>

                {/* Donate Button Section */}
                <div className="p-10 bg-slate-50 text-center">
                    <button 
                        onClick={() => document.getElementById('donate-modal').showModal()}
                        className="px-12 py-4 bg-gradient-to-r from-red-600 to-rose-700 text-white font-black text-xl rounded-2xl hover:scale-105 transition-transform shadow-xl"
                    >
                        DONATE NOW
                    </button>
                </div>
            </div>

            {/* DaisyUI Modal for Donation Confirmation */}
            <dialog id="donate-modal" className="modal">
                <div className="modal-box rounded-3xl p-10">
                    <h3 className="font-black text-2xl text-slate-800 mb-6 italic">Confirm Donation</h3>
                    <form onSubmit={handleDonate} className="space-y-4">
                        <div className="form-control">
                            <label className="label font-bold text-slate-600">Donor Name</label>
                            <input type="text" value={user?.displayName} readOnly className="input input-bordered bg-gray-100 font-medium" />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold text-slate-600">Donor Email</label>
                            <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-100 font-medium" />
                        </div>
                        <div className="modal-action">
                            <button type="submit" className="btn bg-red-600 hover:bg-red-700 text-white w-full rounded-xl">Confirm & Commit</button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default RequestDetails;