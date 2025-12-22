import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-12">
                {/* Logo Section */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="bg-red-600 p-1.5 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-white">Blood<span className="text-red-600">Flow</span></span>
                    </div>
                    <p className="text-sm leading-relaxed">
                        Connecting life-savers across the nation. Join us in our mission to ensure no one suffers due to a lack of blood.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/donation-requests" className="hover:text-red-500 transition-colors">Donation Requests</Link></li>
                        <li><Link to="/search" className="hover:text-red-500 transition-colors">Search Donors</Link></li>
                        <li><Link to="/register" className="hover:text-red-500 transition-colors">Join as Donor</Link></li>
                        <li><Link to="/login" className="hover:text-red-500 transition-colors">Login</Link></li>
                    </ul>
                </div>

                {/* Important Links */}
                <div>
                    <h4 className="text-white font-bold mb-6">Support</h4>
                    <ul className="space-y-4 text-sm">
                        <li><Link to="/" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/" className="hover:text-red-500 transition-colors">Terms of Service</Link></li>
                        <li><Link to="/" className="hover:text-red-500 transition-colors">About Us</Link></li>
                        <li><Link to="/" className="hover:text-red-500 transition-colors">FAQ</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-white font-bold mb-6">Stay Updated</h4>
                    <div className="flex flex-col gap-4">
                        <input 
                            type="email" 
                            placeholder="Email address" 
                            className="bg-gray-800 border-none p-3 rounded-lg text-sm focus:ring-2 focus:ring-red-600 outline-none" 
                        />
                        <button className="bg-red-600 text-white py-2 rounded-lg font-bold hover:bg-red-700 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            <div className="text-center mt-8 text-xs text-gray-500">
                © {new Date().getFullYear()} BloodFlow. Developed with ❤️ for Humanity.
            </div>
        </footer>
    );
};

export default Footer;