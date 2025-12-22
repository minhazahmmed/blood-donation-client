import React, { useState, useContext, useEffect } from "react";
import { FaTint } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddRequest = () => {
  const { user } = useContext(AuthContext);

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;

    const requester_name = form.requester_name.value;
    const requester_email = form.requester_email.value;
    const recipientName = form.recipientName.value;
    const recipient_district = district;
    const recipient_upazila = upazila;
    const hospitalName = form.hospitalName.value;
    const fullAddress = form.fullAddress.value;
    const bloodGroup = form.bloodGroup.value;

    const donationDate = form.donationDate.value;
    const donationTime = form.donationTime.value;
    const requestMessage = form.requestMessage.value;

    const formData = {
      requester_name,
      requester_email,
      recipientName,
      recipient_district,
      recipient_upazila,
      hospitalName,
      fullAddress,
      bloodGroup,
      donationDate,
      donationTime,
      requestMessage,
      donation_status: "pending",
    };

    axiosSecure
      .post("/requests", formData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Blood donation request posted successfully",
            icon: "success",
            confirmButtonColor: "#b91c1c",
            confirmButtonText: "Okay"
          });
          form.reset(); 
          setDistrict(""); 
          setUpazila(""); 
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#b91c1c"
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-red-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-500 text-white text-center py-6 sm:py-8">
          <FaTint className="text-3xl sm:text-4xl mx-auto mb-2" />
          <h2 className="text-xl sm:text-2xl font-bold">Blood Donation Request</h2>
          <p className="text-xs sm:text-sm opacity-90 px-4">Request blood to save lives</p>
        </div>

        {/* Form */}
        <form className="p-5 sm:p-8 space-y-4" onSubmit={handleRequest}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">Requester Name</label>
              <input type="text" value={user?.displayName || ""} name="requester_name" readOnly
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm font-['Inter']" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">Requester Email</label>
              <input type="email" value={user?.email || ""} name="requester_email" readOnly
                className="w-full p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-sm font-['Inter']" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium mb-1">Recipient Name</label>
            <input type="text" name="recipientName" required
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm font-['Inter']" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} required
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-sm font-['Inter']">
                <option value="" disabled>Select District</option>
                {districts.map((d) => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">Upazila</label>
              <select value={upazila} onChange={(e) => setUpazila(e.target.value)} required
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-sm font-['Inter']">
                <option value="" disabled>Select Upazila</option>
                {upazilas.map((u) => <option key={u?.id} value={u?.name}>{u?.name}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium mb-1">Hospital Name</label>
            <input type="text" name="hospitalName" required
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-sm font-['Inter']" />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium mb-1">Full Address</label>
            <input type="text" name="fullAddress" required placeholder="Ex: Zahir Raihan Rd, Dhaka"
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-sm font-['Inter']" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">Blood Group</label>
              <select name="bloodGroup" required className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-sm font-['Inter']">
                <option value="">Select</option>
                <option value="A+">A+</option><option value="A-">A-</option>
                <option value="B+">B+</option><option value="B-">B-</option>
                <option value="AB+">AB+</option><option value="AB-">AB-</option>
                <option value="O+">O+</option><option value="O-">O-</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">Date</label>
              <input type="date" name="donationDate" required className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-['Inter']" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm font-medium mb-1">Time</label>
              <input type="time" name="donationTime" required className="w-full p-2.5 rounded-lg border border-gray-300 text-sm font-['Inter']" />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm font-medium mb-1">Request Message</label>
            <textarea name="requestMessage" required rows="3" placeholder="Explain why blood is needed"
              className="w-full p-2.5 rounded-lg border border-gray-300 focus:border-red-500 text-sm font-['Inter']"></textarea>
          </div>

          <button type="submit" className="w-full py-3.5 bg-red-700 hover:bg-rose-600 text-white rounded-xl font-bold text-base sm:text-lg shadow-md transition-all font-['Inter']">
            Request Blood
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;