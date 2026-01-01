import React, { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null); 
    const [loading, setLoading] = useState(true);
    const axiosInstance = useAxios();

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/all-blogs')
            .then(res => {
             
                const publishedBlogs = res.data.filter(blog => blog.status === 'published');
                setBlogs(publishedBlogs);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [axiosInstance]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen bg-slate-50/30">
            {/* হেডার সেকশন */}
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
                    All <span className="text-red-600">Blogs</span>
                </h2>
                <div className="w-16 h-1 bg-red-600 mx-auto mb-3 rounded-full"></div>
                <p className="text-gray-500 text-sm max-w-md mx-auto italic">
                    Read inspiring stories and essential guides about blood donation.
                </p>
            </div>
            
        
            {loading ? (
                <div className="flex justify-center my-20">
                    <span className="loading loading-spinner loading-lg text-red-600"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <div key={blog._id} className="group card bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                            <figure className="relative overflow-hidden">
                                <img 
                                    src={blog.thumbnail} 
                                    alt="blog" 
                                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                />
                              
                            </figure>
                            <div className="card-body p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                                    {blog.title}
                                </h2>
                                <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                                    {blog.content}
                                </p>
                                <div className="card-actions border-t pt-4">
                                    <button 
                                        onClick={() => setSelectedBlog(blog)}
                                        className="text-red-600 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
                                    >
                                        READ FULL BLOG <span>→</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

       
            {!loading && blogs.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl shadow-inner border border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium italic">No blogs published yet. Stay tuned!</p>
                </div>
            )}

            {/* --- Read More Modal (Fixed for Mobile & Scrolling) --- */}
            {selectedBlog && (
                <div className="modal modal-open modal-bottom sm:modal-middle bg-slate-900/60 backdrop-blur-sm transition-all z-[1000]">
                    <div className="modal-box p-0 rounded-t-3xl sm:rounded-3xl overflow-hidden bg-white w-11/12 max-w-3xl max-h-[90vh] flex flex-col shadow-2xl mx-auto">
                        
                        {/* ফিক্সড ক্লোজ বাটন */}
                        <button 
                            onClick={() => setSelectedBlog(null)}
                            className="btn btn-circle btn-sm absolute top-4 right-4 z-50 bg-black/50 border-none text-white hover:bg-red-600"
                        >
                            ✕
                        </button>

                        {/* স্ক্রলেবল এরিয়া */}
                        <div className="overflow-y-auto overflow-x-hidden">
                            {/* মোডাল ইমেজ */}
                            <div className="relative h-56 sm:h-80 w-full">
                                <img 
                                    src={selectedBlog.thumbnail} 
                                    className="w-full h-full object-cover" 
                                    alt="Blog Thumbnail" 
                                />
                            </div>
                            
                            {/* মোডাল কন্টেন্ট */}
                            <div className="p-6 sm:p-10">
                                <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400 mb-3 font-medium">
                                    <span className="bg-red-50 text-red-600 px-2 py-1 rounded">Blood Awareness</span>
                                    <span>•</span>
                                    <span>{new Date(selectedBlog.createdAt).toLocaleDateString()}</span>
                                </div>

                                <h3 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                                    {selectedBlog.title}
                                </h3>

                                <div className="divider"></div>

                                <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm sm:text-base text-justify">
                                    {selectedBlog.content}
                                </p>
                                
                                <div className="mt-8 pb-4 flex justify-end">
                                    <button 
                                        onClick={() => setSelectedBlog(null)}
                                        className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-xl px-10 shadow-lg shadow-red-100"
                                    >
                                        Close Reading
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

          
            <style dangerouslySetInnerHTML={{ __html: `
                .modal-box::-webkit-scrollbar {
                    width: 5px;
                }
                .modal-box::-webkit-scrollbar-thumb {
                    background-color: #ef4444;
                    border-radius: 10px;
                }
                .overflow-y-auto::-webkit-scrollbar {
                    width: 5px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background-color: #ef4444;
                    border-radius: 10px;
                }
            `}} />
        </div>
    );
};

export default Blogs;