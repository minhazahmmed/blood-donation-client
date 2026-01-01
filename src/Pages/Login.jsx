/* eslint-disable no-irregular-whitespace */
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash, FaTint } from "react-icons/fa";
import useAxios from "../hooks/useAxios";

const Login = () => {
  const axiosPublic = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const { loginWithEmailPassword, setUser, googleSignin } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ SINGLE SOURCE OF TRUTH
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    loginWithEmailPassword(email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        toast.success("Login successful 🩸");
        navigate(from, { replace: true }); // ✅ FIXED
      })
      .catch(() => {
        toast.error("Invalid credentials");
      });
  };

  const handleGoogleSignin = () => {
    googleSignin().then(async (result) => {
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        blood: "",
        district: "",
        upazila: "",
      };

      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId || res.data.message === "User exists") {
        setUser(user);
        toast.success("Login successful 🩸");
        navigate(from, { replace: true }); // ✅ FIXED
      }
    });
  };

  const handleForget = () => {
    navigate(`/forget/${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-rose-100 to-red-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-200 my-5">
        <div className="bg-linear-to-r from-red-600 to-rose-500 text-white text-center py-6 rounded-t-3xl">
          <FaTint className="text-4xl mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Blood Donation</h2>
          <p className="text-sm opacity-90">Login to save lives</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
           {/* Email */}
          <div>
            <label className="text-sm font-semibold text-red-600">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              className="input input-bordered w-full border-red-300 focus:border-red-500"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-red-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full border-red-300 focus:border-red-500"
                placeholder="Enter your password"
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-red-500 text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              onClick={handleForget}
              className="text-sm text-red-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>


          <button
            type="submit"
            className="btn w-full bg-linear-to-r from-red-600 to-rose-500 text-white"
          >
            Login
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            onClick={handleGoogleSignin}
            className="btn w-full border border-red-300"
          >
            <FcGoogle /> Continue with Google
          </button>

          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?
            <Link
              to="/register"
              state={{ from: location.state?.from }}
              className="text-red-600 font-semibold ml-1"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
