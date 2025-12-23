import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import {  ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

const AllDonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState('');

    const fetchAllRequests = () => {
        axiosSecure.get('/all-requests')
            .then(res => setRequests(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAllRequests();
    }, []);

    // ডিলিট হ্যান্ডলার
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/request/delete/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            fetchAllRequests();
                            Swal.fire("Deleted!", "Request has been deleted.", "success");
                        }
                    });
            }
        });
    };

    // ফিল্টার করা ডেটা
    const filteredRequests = filter 
        ? requests.filter(req => req.donation_status === filter) 
        : requests;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Blood Donation Requests</h2>
                
                {/* ফিল্টার ড্রপডাউন */}
                <select 
                    className="select select-bordered w-full max-w-xs"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="done">Done</option>
                    <option value="canceled">Canceled</option>
                </select>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date & Time</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map((req) => (
                            <tr key={req._id}>
                                <td>
                                    <div className="font-bold">{req.recipient_name}</div>
                                    <div className="text-sm opacity-60">Group: {req.bloodGroup}</div>
                                </td>
                                <td>{req.recipient_upazila}, {req.recipient_district}</td>
                                <td>
                                    <div>{req.donation_date}</div>
                                    <div className="text-xs text-gray-400">{req.donation_time}</div>
                                </td>
                                <td>
                                    <span className={`badge badge-sm font-bold p-3 ${
                                        req.donation_status === 'pending' ? 'badge-warning' : 
                                        req.donation_status === 'inprogress' ? 'badge-info' : 
                                        req.donation_status === 'done' ? 'badge-success text-white' : 'badge-ghost'
                                    }`}>
                                        {req.donation_status}
                                    </span>
                                </td>
                                <td className="flex justify-center gap-2">
                                    <button 
                                        onClick={() => handleDelete(req._id)}
                                        className="btn btn-error btn-xs text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AllDonationRequests;