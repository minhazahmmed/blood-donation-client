import React, { useState, useContext, useEffect } from "react";
import { FaTint } from "react-icons/fa";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

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
      .then((res) => alert(res.data.insertedId))
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-red-200">
        {/* Header */}
        <div className="bg-linear-to-r from-red-600 to-rose-500 text-white text-center py-5 rounded-t-3xl">
          <FaTint className="text-4xl mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Blood Donation Request</h2>
          <p className="text-sm opacity-90">Request blood to save lives</p>
        </div>

        {/* Form */}
        <form className="p-6 space-y-4" onSubmit={handleRequest}>
          {/* Requester Info */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Requester Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              name="requester_name"
              readOnly
              className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Requester Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              name="requester_email"
              readOnly
              className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
            />
          </div>

          {/* Recipient Info */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipientName"
              required
              className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Recipient District
              </label>
              <select
                value={district}
                name="recipient_district"
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
              >
                <option value="" disabled>
                  Select District
                </option>
                {districts.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Recipient Upazila
              </label>
              <select
                value={upazila}
                name="recipient_upazila"
                onChange={(e) => setUpazila(e.target.value)}
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
              >
                <option value="" disabled>
                  Select Upazila
                </option>
                {upazilas.map((u) => (
                  <option key={u?.id} value={u?.name}>
                    {u?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospitalName"
              required
              className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Full Address
            </label>
            <input
              type="text"
              name="fullAddress"
              required
              placeholder="Zahir Raihan Rd, Dhaka"
              className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
            />
          </div>

          {/* Blood Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 font-medium mb-1">
                Donation Time
              </label>
              <input
                type="time"
                name="donationTime"
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Request Message
            </label>
            <textarea
              name="requestMessage"
              required
              rows="3"
              placeholder="Explain why blood is needed"
              className="w-full p-2 rounded-md border border-gray-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-base"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-rose-500 text-white rounded-lg font-medium text-lg shadow-md transition-colors"
          >
            Request Blood
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRequest;
