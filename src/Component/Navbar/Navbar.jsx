import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { signOut } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li><Link to="/" className="text-[16px] font-semibold hover:text-red-600">Home</Link></li>
      <li><Link to="/donation-requests" className="text-[16px] font-semibold hover:text-red-600">Donation Requests</Link></li>
      <li><Link to="/search" className="text-[16px] font-semibold hover:text-red-600">Search Donors</Link></li>
      {user && <li><Link to="/donate" className="text-[16px] font-semibold hover:text-red-600">Funding</Link></li>}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4 md:px-8">
      {/* Navbar Start: Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-red-600 p-1.5 rounded-lg">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
             </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-800 hidden sm:block">
            Blood<span className="text-red-600">Flow</span>
          </span>
        </Link>
      </div>

      {/* Navbar Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>

      {/* Navbar End: User Profile or Login */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-red-100">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || "https://i.ibb.co/mJR6S7q/default-user.png"} alt="User Profile" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-100">
              <li className="px-4 py-2 font-bold text-red-600 border-b border-gray-100 mb-1">
                {user?.displayName || "User"}
              </li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-ghost btn-sm text-red-600 border-red-600 hover:bg-red-50 hidden sm:flex">
              Login
            </Link>
            <Link to="/register" className="btn btn-error btn-sm text-white bg-red-600 hover:bg-red-700">
              Join Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;