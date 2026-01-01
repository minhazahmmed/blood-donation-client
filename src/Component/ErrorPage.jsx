import React from "react";
import { Link } from "react-router";
import { FaTint, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-50 px-4 py-10">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-rose-100 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-10 -right-10 text-rose-100 opacity-50">
          <FaTint size={150} />
        </div>

        <div className="relative">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-6 rounded-full animate-bounce">
              <FaExclamationTriangle className="text-red-700 text-6xl" />
            </div>
          </div>

          <h1 className="text-9xl font-black text-red-700 mb-2 drop-shadow-lg">
            404
          </h1>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>

          <p className="text-gray-500 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track to saving lives!
          </p>

          <Link
            to="/"
            className="btn bg-red-600 hover:bg-red-700 text-white border-none rounded-full px-10 py-3 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 mx-auto"
          >
            Return to Lifeline
          </Link>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-sm text-rose-400 font-medium italic">
            "Your one click can save a life, but this link won't!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
