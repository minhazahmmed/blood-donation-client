import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddBlog = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const blogInfo = {
            title: data.title,
            thumbnail: data.thumbnail,
            content: data.content,
        };

        const res = await axiosSecure.post("/blogs", blogInfo);
        if (res.data.insertedId) {
            Swal.fire("Success", "Blog drafted successfully!", "success");
            reset();
            navigate("/dashboard/content-management");
        }
    };

    return (
        <div className="p-10 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-5">Add New Blog</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("title")} placeholder="Blog Title" className="input input-bordered w-full" required />
                <input {...register("thumbnail")} placeholder="Thumbnail Image URL" className="input input-bordered w-full" required />
                <textarea {...register("content")} placeholder="Blog Content" className="textarea textarea-bordered w-full h-40" required></textarea>
                <button className="btn bg-red-600 text-white w-full">Create Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;