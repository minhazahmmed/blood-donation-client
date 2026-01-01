import React, { useState, useEffect } from "react";
import { FaTint } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateUserRequest = () => {
    const requestData = useLoaderData(); 
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState(requestData?.recipient_district || "");
    const [upazila, setUpazila] = useState(requestData?.recipient_upazila || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [upazilaRes, districtRes] = await Promise.all([
                    axios.get("/upazila.json"),
                    axios.get("/district.json")
                ]);
                setUpazilas(upazilaRes.data.upazilas);
                setDistricts(districtRes.data.districts);
            } catch (err) {
                console.error("Error loading location data", err);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const updatedFormData = {
            recipientName: form.recipientName.value,
            recipient_district: district,
            recipient_upazila: upazila,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            bloodGroup: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
        };

        try {
            const res = await axiosSecure.patch(`/request/update/${requestData._id}`, updatedFormData);
            if (res.data.matchedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Your request has been updated successfully.",
                    icon: "success",
                    confirmButtonColor: "#b91c1c",
                });
                navigate("/dashboard/my-request"); 
            }
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update request", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-8 font-['Inter']">
            <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-red-100 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-700 to-rose-600 text-white text-center py-6 sm:py-8">
                    <FaTint className="text-3xl sm:text-4xl mx-auto mb-2" />
                    <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">Update Request Info</h2>
                </div>

                {/* Form */}
                <form className="p-5 sm:p-8 space-y-4" onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-slate-700 text-sm font-semibold mb-1">Requester Name</label>
                            <input type="text" defaultValue={requestData?.requester_name} readOnly
                                className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-slate-500 font-medium cursor-not-allowed" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-slate-700 text-sm font-semibold mb-1">Requester Email</label>
                            <input type="email" defaultValue={requestData?.requester_email} readOnly
                                className="w-full p-2.5 rounded-lg border border-gray-200 bg-gray-50 text-slate-500 font-medium cursor-not-allowed" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-slate-700 text-sm font-semibold mb-1">Recipient Name</label>
                        <input type="text" name="recipientName" defaultValue={requestData?.recipientName} required
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-700 font-medium" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-slate-700 text-sm font-semibold mb-1">District</label>
                            <select value={district} onChange={(e) => setDistrict(e.target.value)} required
                                className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-slate-700 font-medium">
                                {districts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-slate-700 text-sm font-semibold mb-1">Upazila</label>
                            <select value={upazila} onChange={(e) => setUpazila(e.target.value)} required
                                className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-slate-700 font-medium">
                                {upazilas.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-slate-700 text-sm font-semibold mb-1">Hospital Name</label>
                        <input type="text" name="hospitalName" defaultValue={requestData?.hospitalName} required
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-slate-700 font-medium" />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-slate-700 text-sm font-semibold mb-1">Full Address</label>
                        <input type="text" name="fullAddress" defaultValue={requestData?.fullAddress} required
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-slate-700 font-medium" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-slate-700 text-sm font-semibold mb-1">Blood Group</label>
                            <select name="bloodGroup" defaultValue={requestData?.bloodGroup} required className="w-full p-2.5 rounded-lg border border-gray-300 text-slate-700 font-medium">
                                <option value="A+">A+</option><option value="A-">A-</option>
                                <option value="B+">B+</option><option value="B-">B-</option>
                                <option value="AB+">AB+</option><option value="AB-">AB-</option>
                                <option value="O+">O+</option><option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-slate-700 text-sm font-semibold mb-1">Date</label>
                            <input type="date" name="donationDate" defaultValue={requestData?.donationDate} required className="w-full p-2.5 rounded-lg border border-gray-300 text-slate-700 font-medium" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-slate-700 text-sm font-semibold mb-1">Time</label>
                            <input type="time" name="donationTime" defaultValue={requestData?.donationTime} required className="w-full p-2.5 rounded-lg border border-gray-300 text-slate-700 font-medium" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-slate-700 text-sm font-semibold mb-1">Request Message</label>
                        <textarea name="requestMessage" defaultValue={requestData?.requestMessage} required rows="3"
                            className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-slate-700 font-medium"></textarea>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-3.5 bg-red-700 hover:bg-red-800 text-white rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98] disabled:bg-gray-400 flex justify-center items-center"
                    >
                        {isSubmitting ? <span className="loading loading-spinner"></span> : "Update Request Info"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserRequest;