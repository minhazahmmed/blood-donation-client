import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddBlog = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isUpdating, setIsUpdating] = useState(false);

    const imgbb_key = "ff21f88bbb90604c7fbb3cb308bbfa68";
    const img_hosting_api = `https://api.imgbb.com/1/upload?key=${imgbb_key}`;

    const onSubmit = async (data) => {
        setIsUpdating(true);
        try {
            let photoURL = "";

            if (data.image && data.image[0]) {
                const imgData = new FormData();
                imgData.append("image", data.image[0]);
                
                const imgRes = await axios.post(img_hosting_api, imgData);
                
                if (imgRes.data.success) {
                    photoURL = imgRes.data.data.display_url;
                }
            }

            const blogInfo = {
                title: data.title,
                thumbnail: photoURL, 
                content: data.content,
                status: "draft",
                createdAt: new Date()
            };

            const res = await axiosSecure.post("/blogs", blogInfo);
            
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Blog Created!",
                    text: "Your blog has been saved as a draft.",
                    timer: 2000,
                    showConfirmButton: false
                });
                reset();
                navigate("/dashboard/content-management");
            }

        } catch (error) {
            console.error("Blog Add Error:", error);
            Swal.fire({ 
                icon: "error", 
                title: "Failed to add blog", 
                text: error.response?.data?.message || "Something went wrong!" 
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-10">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-red-700 p-8 text-white text-center">
                    <h2 className="text-3xl font-bold">Add New Blog</h2>
                    <p className="text-red-100 text-sm mt-1">Spread awareness through your words</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
                    {/* Blog Title */}
                    <div className="form-control w-full">
                        <label className="label pb-2">
                            <span className="label-text text-slate-700 font-bold text-lg">Blog Title</span>
                        </label>
                        <input 
                            {...register("title")} 
                            type="text" 
                            placeholder="Enter a catchy title" 
                            className="input input-bordered focus:border-red-500 rounded-xl w-full" 
                            required 
                        />
                    </div>

                    {/* Thumbnail Image */}
                    <div className="form-control w-full">
                        <label className="label pb-2">
                            <span className="label-text text-slate-700 font-bold text-lg">Thumbnail Image</span>
                        </label>
                        <input 
                            {...register("image")} 
                            type="file" 
                            className="file-input file-input-bordered file-input-error w-full rounded-xl" 
                            required 
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="form-control w-full">
                        <label className="label pb-2">
                            <span className="label-text text-slate-700 font-bold text-lg">Blog Content</span>
                        </label>
                        <textarea 
                            {...register("content")} 
                            placeholder="Write your blog details here..." 
                            className="textarea textarea-bordered focus:border-red-500 rounded-xl h-44 text-base leading-relaxed w-full" 
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={isUpdating} 
                            className="btn bg-red-700 hover:bg-red-800 text-white w-full h-14 rounded-xl border-none shadow-lg shadow-red-200 text-lg font-bold transition-all duration-300"
                        >
                            {isUpdating ? (
                                <span className="flex items-center gap-2">
                                    <span className="loading loading-spinner"></span> Creating...
                                </span>
                            ) : "Post Blog Now"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;