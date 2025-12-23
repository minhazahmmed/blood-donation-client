import React, { useContext } from 'react';
import useAxios from '../../hooks/useAxios';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaHeart, FaDollarSign } from 'react-icons/fa';

const Donate = () => {
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    const handleCheckout = (e) => {
        e.preventDefault();
        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email;
        const donorName = user?.displayName;

        const formData = {
            donateAmount,
            donorEmail,
            donorName,
        };

        axiosInstance.post('/create-payment-checkout', formData)
            .then(res => {
                window.location.href = res.data.url;
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-rose-100 to-red-200 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-200 overflow-hidden">
                <div className="bg-linear-to-r from-red-600 to-rose-500 text-white text-center py-8">
                    <FaHeart className="text-5xl mx-auto mb-3 animate-pulse" />
                    <h2 className="text-3xl font-bold">Support Our Cause</h2>
                    <p className="text-sm opacity-90 font-medium">Your donation saves lives</p>
                </div>

                <form onSubmit={handleCheckout} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-red-700 ml-1">
                            Donation Amount (USD)
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-3.5 text-red-500">
                                <FaDollarSign />
                            </span>
                            <input
                                name='donateAmount'
                                type="number"
                                placeholder="Enter amount (e.g. 10)"
                                className="input input-bordered w-full pl-5 border-red-200 focus:border-red-500 rounded-xl font-semibold"
                                required
                                min="1"
                            />
                        </div>
                    </div>

                    <button 
                        type='submit' 
                        className="btn w-full bg-linear-to-r from-red-600 to-rose-500 text-white border-none rounded-xl text-lg font-semibold hover:scale-[1.02] transition-transform shadow-lg"
                    >
                        Donate Now
                    </button>

                    <p className="text-center text-xs text-gray-500 font-medium">
                        Secure payment powered by Stripe
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Donate;