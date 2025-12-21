import React from 'react';
import { useNavigate } from 'react-router';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-10 text-center border-t-8 border-success">
                <div className="text-success mb-6">
                    {/* একটি বড় সাকসেস চেক আইকন */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-gray-800">Thank You!</h2>
                
                <div className="space-y-4 mt-4">
                    <p className="text-lg font-medium text-success">
                        Payment Received Successfully
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Your generous donation will help provide blood to those in critical need. We have sent a confirmation details to your email.
                    </p>
                </div>

                <div className="divider my-6"></div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate('/dashboard/my-request')} 
                        className="btn btn-success text-white w-full shadow-md"
                    >
                        Go to Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn btn-ghost btn-sm text-gray-500"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;