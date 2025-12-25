import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "../../../Provider/AuthProvider"; 

const ContentManagement = () => {
    const axiosSecure = useAxiosSecure();
    const { role } = useContext(AuthContext);
    const [blogs, setBlogs] = useState([]);

    // ডাটা লোড করার ফাংশন
    const loadBlogs = async () => {
        try {
            const res = await axiosSecure.get("/all-blogs");
            setBlogs(res.data);
        } catch (error) {
            console.error("Error loading blogs:", error);
        }
    };

    useEffect(() => {
        loadBlogs();
    }, []);

    const handleStatus = async (id, status) => {
        try {
            await axiosSecure.patch(`/blogs/status/${id}`, { status });
            Swal.fire("Updated", `Blog is now ${status}`, "success");
            loadBlogs(); // ডাটা রিফ্রেশ
        } catch (error) {
            Swal.fire("Error", "Failed to update status", "error");
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/blogs/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire("Deleted!", "Your blog has been deleted.", "success");
                    loadBlogs(); // ডাটা রিফ্রেশ
                }
            }
        });
    };

    return (
        <div className="p-5">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold font-serif text-red-600">Content Management</h2>
                <Link to="/dashboard/content-management/add-blog" className="btn bg-red-600 hover:bg-red-700 text-white border-none">
                    Add Blog
                </Link>
            </div>

            {blogs.length === 0 ? (
                <div className="text-center py-20 text-gray-500">No blogs found. Create one!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
                    {blogs.map(blog => (
                        <div key={blog._id} className="card bg-base-100 shadow-xl border overflow-hidden">
                            <figure><img src={blog.thumbnail} alt="blog" className="h-48 w-full object-cover" /></figure>
                            <div className="card-body p-4">
                                <h2 className="card-title text-lg font-bold">{blog.title}</h2>
                                <p className="text-sm text-gray-500">Status: 
                                    <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {blog.status.toUpperCase()}
                                    </span>
                                </p>
                                <div className="card-actions justify-end mt-4 gap-2">
                                    {role === "admin" && (
                                        <>
                                            {blog.status === "draft" ? 
                                                <button onClick={() => handleStatus(blog._id, "published")} className="btn btn-sm btn-success text-white">Publish</button> :
                                                <button onClick={() => handleStatus(blog._id, "draft")} className="btn btn-sm btn-warning text-white">Unpublish</button>
                                            }
                                            <button onClick={() => handleDelete(blog._id)} className="btn btn-sm btn-outline btn-error font-bold">Delete</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContentManagement;