import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";

const UpdateProfile = () => {
    const { user, updateUserProfile, setUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
     
        axios.get("/district.json").then((res) => setDistricts(res.data.districts));
        axios.get("/upazila.json").then((res) => setUpazilas(res.data.upazilas));

        if (user?.email) {
            setLoading(true);
            axiosSecure.get(`/user/${user?.email}`)
                .then(res => {
                    if (res.data) {
                        reset(res.data);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Error fetching user data:", err);
                    setLoading(false);
                });
        }
    }, [user?.email, axiosSecure, reset]); 

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            let photoURL = data.photoURL; 

   
            if (data.image && data.image[0]) {
                const imgData = new FormData();
                imgData.append("image", data.image[0]);
                const imgRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=ff21f88bbb90604c7fbb3cb308bbfa68`,
                    imgData
                );
                if (imgRes.data.success) {
                    photoURL = imgRes.data.data.display_url;
                }
            }

       
            await updateUserProfile(data.name, photoURL);
            
       
            const updatedDoc = {
                name: data.name,
                photoURL: photoURL,
                blood: data.blood,
                district: data.district,
                upazila: data.upazila
            };

            const res = await axiosSecure.patch(`/user/update/${user?.email}`, updatedDoc);
            
        
          if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
    setUser({
        ...user,
        displayName: updatedDoc.name,
        photoURL: updatedDoc.photoURL
    });

                Swal.fire({
                    icon: "success",
                    title: "Profile Updated!",
                    text: "Your information is now up to date.",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error("Update Error:", error);
            Swal.fire({ 
                icon: "error", 
                title: "Update Failed", 
                text: error.response?.data?.message || "Something went wrong!" 
            });
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <span className="loading loading-spinner loading-lg text-red-600"></span>
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-10">
   
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-red-700 p-6 text-white text-center">
                    <h2 className="text-2xl font-bold">Edit Profile</h2>
                    <p className="text-red-100 text-sm">Update your information as a life saver</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label text-slate-700 font-medium">Full Name</label>
                            <input {...register("name")} type="text" className="input input-bordered focus:border-red-500 rounded-xl" required />
                        </div>
                        <div className="form-control">
                            <label className="label text-slate-700 font-medium">Email (Not Changeable)</label>
                            <input value={user?.email || ""} readOnly type="email" className="input input-bordered bg-gray-100 text-gray-400 rounded-xl cursor-not-allowed" />
                        </div>
                        {/* ... বাকি ইনপুট ফিল্ডগুলো ... */}
                        <div className="form-control">
                            <label className="label text-slate-700 font-medium">Update Profile Photo</label>
                            <input {...register("image")} type="file" className="file-input file-input-bordered file-input-error w-full rounded-xl" />
                        </div>
                        <div className="form-control">
                            <label className="label text-slate-700 font-medium">Blood Group</label>
                            <select {...register("blood")} className="select select-bordered focus:border-red-500 rounded-xl" required>
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
                        <div className="form-control">
                            <label className="label text-slate-700 font-medium">District</label>
                            <select {...register("district")} className="select select-bordered focus:border-red-500 rounded-xl" required>
                                <option value="">Select District</option>
                                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label text-slate-700 font-medium">Upazila</label>
                            <select {...register("upazila")} className="select select-bordered focus:border-red-500 rounded-xl" required>
                                <option value="">Select Upazila</option>
                                {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-gray-100 flex items-center gap-4">
                        <button type="submit" disabled={isUpdating} className="btn bg-red-700 hover:bg-red-800 text-white w-full md:w-auto px-12 rounded-xl border-none shadow-lg shadow-red-200">
                            {isUpdating ? <span className="loading loading-spinner"></span> : "Save Profile"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;