import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";

const UpdateDonationRequest = () => {
    const requestData = useLoaderData();
    const navigate = useNavigate();
    const auth = getAuth();

    if (!requestData) {
        return <div className="text-center mt-20 font-bold">Loading Data...</div>;
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;

  
        const updatedInfo = {
            recipientName: form.recipientName.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
        };

        try {
            const user = auth.currentUser;
            if (!user) {
                return Swal.fire("Unauthorized", "Please login again", "error");
            }

         
            const token = await user.getIdToken();

            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/request/update/${requestData._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(updatedInfo),
                }
            );

            if (res.status === 401 || res.status === 403) {
                return Swal.fire("Unauthorized", "Session expired. Login again.", "error");
            }

            const data = await res.json();

            if (data.matchedCount > 0) {
                Swal.fire("Success!", "Donation Request Updated Successfully!", "success");
                navigate("/dashboard/all-donation-requests");
            } else {
                Swal.fire("No Change", "Nothing was updated.", "info");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Update failed!", "error");
        }
    };

    return (
        <div className="p-4 lg:p-10 font-inter bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-center">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                        Update Donation Request
                    </h2>
                </div>

                <form onSubmit={handleUpdate} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Recipient Name</label>
                        <input
                            type="text"
                            name="recipientName"
                            defaultValue={requestData.recipientName}
                            className="input input-bordered focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Hospital Name</label>
                        <input
                            type="text"
                            name="hospitalName"
                            defaultValue={requestData.hospitalName}
                            className="input input-bordered focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label font-semibold text-gray-700">Full Address</label>
                        <input
                            type="text"
                            name="fullAddress"
                            defaultValue={requestData.fullAddress}
                            className="input input-bordered w-full focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Donation Date</label>
                        <input
                            type="date"
                            name="donationDate"
                            defaultValue={requestData.donationDate}
                            className="input input-bordered focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-semibold text-gray-700">Donation Time</label>
                        <input
                            type="time"
                            name="donationTime"
                            defaultValue={requestData.donationTime}
                            className="input input-bordered focus:ring-1 focus:ring-red-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="md:col-span-2 mt-4 py-3 bg-red-700 hover:bg-red-800 text-white font-bold text-lg rounded-xl transition-all shadow-lg active:scale-95"
                    >
                        Update Request Info
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDonationRequest;
