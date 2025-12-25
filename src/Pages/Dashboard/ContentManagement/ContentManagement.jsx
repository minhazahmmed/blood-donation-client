import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ContentManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axiosSecure.get('/all-blogs');
            setBlogs(res.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    }, [axiosSecure]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/blogs/status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                fetchBlogs();
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: `Blog is now ${newStatus}`,
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This blog will be permanently removed!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b91c1c", // red-700
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/blogs/${id}`);
                    if (res.data.deletedCount > 0) {
                        fetchBlogs();
                        Swal.fire("Deleted!", "Blog has been removed.", "success");
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete blog", "error");
                }
            }
        });
    };

    // আপনার দেওয়া Loading Bars স্পিনার
    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center bg-slate-50'>
                <span className="loading loading-bars loading-xl text-red-700"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 bg-slate-50 min-h-screen font-['Inter'] text-slate-700">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-semibold text-slate-800 tracking-tight">Content <span className="text-red-700">Management</span>  </h2>
                        <p className="text-slate-500 text-sm mt-1 font-medium italic">Dashboard / Blogs</p>
                    </div>
                    <Link to="/dashboard/content-management/add-blog">
                        <button className="btn bg-red-700 hover:bg-red-800 text-white border-none px-8 rounded-2xl shadow-lg shadow-red-200 transition-all font-semibold uppercase tracking-wide">
                            + Add Blog
                        </button>
                    </Link>
                </div>

                {/* Blog Table Section */}
                <div className="overflow-x-auto bg-white rounded-[2rem] shadow-sm border border-slate-100">
                    <table className="table w-full border-separate border-spacing-0">
                        <thead className="bg-slate-50/50">
                            <tr className="text-slate-500 uppercase text-[11px] tracking-widest font-bold">
                                <th className="py-5 pl-8 border-b border-slate-100">Thumbnail</th>
                                <th className="border-b border-slate-100">Blog Title</th>
                                <th className="border-b border-slate-100">Status</th>
                                <th className="text-center border-b border-slate-100 pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 pl-8">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-16 h-12 border border-slate-100 shadow-sm">
                                                    <img src={blog.thumbnail} alt={blog.title} className="object-cover" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-semibold text-slate-700 max-w-xs truncate">
                                                {blog.title}
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                                                blog.status === 'published' 
                                                ? 'bg-green-50 text-green-700 border border-green-100' 
                                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                                            }`}>
                                                {blog.status}
                                            </span>
                                        </td>
                                        <td className="pr-8">
                                            <div className="flex justify-center items-center gap-3">
                                                <select 
                                                    onChange={(e) => handleStatusChange(blog._id, e.target.value)}
                                                    className="select select-sm select-bordered focus:ring-2 focus:ring-red-100 focus:outline-none rounded-xl font-medium bg-white text-slate-600"
                                                    defaultValue={blog.status}
                                                >
                                                    <option value="draft">Draft</option>
                                                    <option value="published">Publish</option>
                                                </select>
                                                
                                                <button 
                                                    onClick={() => handleDelete(blog._id)} 
                                                    className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
                                                    title="Delete Blog"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-20">
                                        <div className="flex flex-col items-center">
                                            <div className="p-4 bg-slate-50 rounded-full mb-3 text-slate-300">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l2 2h3a2 2 0 012 2v10a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-slate-400 font-semibold italic">No blogs found. Start by adding one!</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;