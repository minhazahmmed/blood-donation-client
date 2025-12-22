import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Fixed Background */}
            <section 
                className="relative h-[550px] md:h-[650px] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=2000')` 
                }}
            >
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
                   <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
  Give Blood, <span className="text-white">Give Hope</span>
</h1>
<p className="text-lg md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto opacity-90">
  A single donation can save multiple lives. Be the reason someone gets a second chance today.
</p>

                    {/* Requirement: Join as Donor & Search Donors buttons */}
                    <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                        <Link 
                            to="/register" 
                            className="px-10 py-4 rounded-full text-lg font-semibold text-white transition-all transform hover:scale-105 active:scale-95 bg-gradient-to-r from-red-600 to-rose-700 shadow-2xl"
                        >
                            Join as a Donor
                        </Link>
                        <Link 
                            to="/search" 
                            className="px-10 py-4 rounded-full text-lg font-semibold text-white transition-all transform hover:scale-105 active:scale-95 bg-gradient-to-r from-slate-700 to-slate-900 border border-slate-600 shadow-2xl"
                        >
                            Search Donors
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-24 bg-white px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Support Blood Donation?</h2>
                    <div className="h-1.5 w-20 bg-red-600 mx-auto mb-16 rounded-full"></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="p-10 rounded-3xl bg-red-50 border border-red-100 hover:shadow-2xl transition-all duration-300 group">
                            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-md mx-auto mb-6 group-hover:bg-red-600 transition-colors">
                                <span className="text-3xl">🩸</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Community Impact</h3>
                            <p className="text-gray-600 leading-relaxed">Your contribution directly supports local hospitals and emergency medical needs in your district.</p>
                        </div>

                        <div className="p-10 rounded-3xl bg-rose-50 border border-rose-100 hover:shadow-2xl transition-all duration-300 group">
                            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-md mx-auto mb-6 group-hover:bg-red-600 transition-colors">
                                <span className="text-3xl">🤝</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Donor Network</h3>
                            <p className="text-gray-600 leading-relaxed">Join thousands of volunteers committed to making blood donation seamless and efficient.</p>
                        </div>

                        <div className="p-10 rounded-3xl bg-red-50 border border-red-100 hover:shadow-2xl transition-all duration-300 group">
                            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-md mx-auto mb-6 group-hover:bg-red-600 transition-colors">
                                <span className="text-3xl">⚡</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">Quick Process</h3>
                            <p className="text-gray-600 leading-relaxed">Our platform ensures a fast connection between donors and recipients when time is critical.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Us Section */}
            <section className="py-24 bg-gray-50 px-4">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row shadow-2xl rounded-[40px] overflow-hidden bg-white">
                  <div className="md:w-5/12 bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 p-12 text-white flex flex-col justify-center relative overflow-hidden">
    {/* ডিজাইন এলিমেন্ট: হালকা একটি গ্লো ইফেক্ট ব্যাকগ্রাউন্ডে */}
    <div className="absolute -top-20 -left-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
    
    <div className="relative z-10">
        <h2 className="text-4xl font-extrabold mb-6 tracking-tight">
            Get In <span className="text-red-500 italic">Touch</span>
        </h2>
        <p className="text-lg opacity-80 mb-10 text-slate-200 font-medium leading-relaxed">
            Have questions or need assistance? Our team is available 24/7 to support your cause and connect you with life-savers.
        </p>
        
        <div className="space-y-8 text-lg">
            {/* Phone */}
            <div className="flex items-center gap-5 group">
                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-red-600/20 transition-colors duration-300">
                    <span className="text-2xl">📞</span>
                </div>
                <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Call Us</p>
                    <p className="font-semibold text-white">+880 1234 567 890</p>
                </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-5 group">
                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-red-600/20 transition-colors duration-300">
                    <span className="text-2xl">📧</span>
                </div>
                <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Email Us</p>
                    <p className="font-semibold text-white">contact@bloodflow.com</p>
                </div>
            </div>
        </div>
    </div>
</div>
                    <div className="md:w-7/12 p-12">
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <input type="text" placeholder="Full Name" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                                <input type="email" placeholder="Email Address" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
                            </div>
                            <textarea placeholder="How can we help?" rows="4" className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"></textarea>
                            <button className="w-full py-4 bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-red-200 transition-all active:scale-[0.98]">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;