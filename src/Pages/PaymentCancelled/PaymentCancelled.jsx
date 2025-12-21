import React from 'react';
import { useNavigate } from 'react-router';

const PaymentCancelled = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-5">
            <div className="card w-full max-w-md bg-base-100 shadow-xl p-10 text-center border-t-4 border-error">
                <div className="text-error mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Payment Cancelled</h2>
                <p className="py-4 text-gray-600">
                    Your payment process was cancelled or couldn't be completed. No charges were made to your account.
                </p>
                <div className="flex flex-col gap-3 mt-6">
                    <button 
                        onClick={() => navigate('/donate')} 
                        className="btn btn-primary w-full"
                    >
                        Try Again
                    </button>
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn btn-outline w-full"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;