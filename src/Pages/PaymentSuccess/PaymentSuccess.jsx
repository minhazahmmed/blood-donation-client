import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxios from '../../hooks/useAxios';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosInstance = useAxios();
    const hasCalled = useRef(false);
    const [processing, setProcessing] = useState(true);

    useEffect(() => {
     
        if (hasCalled.current || !sessionId) return;

        hasCalled.current = true; 

        axiosInstance.post(`/success-payment?session_id=${sessionId}`)
            .then(res => {
            
                setProcessing(false);
            })
            .catch(err => {
                console.error("Error recording payment:", err);
                setProcessing(false);
            });
    }, [axiosInstance, sessionId]);

    if (processing) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white font-semibold">
                <span className="loading loading-spinner loading-lg text-red-600"></span>
                <p className="mt-4 text-red-600">Processing your donation...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-green-50 to-emerald-100 p-5">
            <div className="card w-full max-w-md bg-white shadow-2xl p-10 text-center border-t-8 border-green-500 rounded-3xl">
                <div className="text-green-500 mb-6 scale-125">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-gray-800">Success!</h2>
                
                <div className="space-y-4 mt-4">
                    <p className="text-lg font-semibold text-green-600">
                        Payment Received Successfully
                    </p>
                    <p className="text-gray-600 leading-relaxed font-medium">
                        Your generous donation will help provide blood to those in critical need. A confirmation has been sent to your email.
                    </p>
                </div>

                <div className="divider my-6"></div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => navigate('/dashboard/my-request')} 
                        className="btn bg-green-500 hover:bg-green-600 border-none text-white w-full shadow-md font-semibold"
                    >
                        Go to Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/')} 
                        className="btn btn-ghost btn-sm text-gray-500 font-medium"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;