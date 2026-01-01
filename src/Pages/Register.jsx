/* eslint-disable no-irregular-whitespace */
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash, FaTint } from "react-icons/fa";
import axios from "axios";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const { registerWithEmailPassword, setUser, fetchUserInfo, loading } =
    useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();


  const destination = location.state?.from?.pathname || "/";

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const blood = form.blood.value;
    const file = form.photoURL.files[0];

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    setPasswordError("");

    if (password.length < 6)
      return setPasswordError("Password must be at least 6 characters");

    if (!uppercase.test(password))
      return setPasswordError("At least one uppercase letter required");

    if (!lowercase.test(password))
      return setPasswordError("At least one lowercase letter required");

    try {
      const imgData = new FormData();
      imgData.append("image", file);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=ff21f88bbb90604c7fbb3cb308bbfa68`,
        imgData
      );

      const photoURL = imgRes.data.data.display_url;

      const userCredential = await registerWithEmailPassword(email, password);

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL,
      });

      setUser(userCredential.user);

      const formData = {
        name,
        email,
        password,
        photoURL,
        blood,
        district,
        upazila,
        status: "active",
        role: "donor",
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/users`, formData);

      if (fetchUserInfo) {
        await fetchUserInfo(email);
      }

      toast.success("Welcome to Blood Donation Network 🩸", {
        position: "bottom-right",
      });

      navigate(destination, { replace: true });
    } catch (error) {
      toast.error(error.message, { position: "bottom-right" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-rose-100 to-red-200 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-200">
        <div className="bg-linear-to-r from-red-600 to-rose-500 text-white text-center py-6 rounded-t-3xl">
          <FaTint className="text-4xl mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Blood Donation</h2>
          <p className="text-sm opacity-90">Register as a life saver</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-semibold text-red-700">
              Full Name
            </label>
            <input
              name="name"
              className="input input-bordered w-full border-red-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-red-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full border-red-300"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {/* Photo */}
          <div>
            <label className="text-sm font-semibold text-red-700">
              Profile Photo
            </label>
            <input
              name="photoURL"
              type="file"
              className="file-input file-input-bordered w-full border-red-300"
              required
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="text-sm font-semibold text-red-700">
              Blood Group
            </label>
            <select
              name="blood"
              className="select select-bordered w-full border-red-300"
              defaultValue=""
              required
            >
              <option disabled value="">
                Select Blood Group
              </option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          {/* District */}
          <div>
            <label className="text-sm font-semibold text-red-700">
              District
            </label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="select select-bordered w-full border-red-300"
              required
            >
              <option value="" disabled>
                Select District
              </option>
              {districts?.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="text-sm font-semibold text-red-700">
              Upazila
            </label>
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="select select-bordered w-full border-red-300"
              required
            >
              <option value="" disabled>
                Select Upazila
              </option>
              {upazilas?.map((u) => (
                <option key={u?.id} value={u?.name}>
                  {u?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-red-700">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full border-red-300"
                placeholder="Create a strong password"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-red-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {passwordError && (
            <p className="text-sm text-red-600">{passwordError}</p>
          )}


          <button
            disabled={loading}
            className="btn rounded-lg w-full bg-linear-to-r from-red-600 to-rose-500 text-white"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already registered?
            <Link
              to="/login"
              
              state={{ from: location.state?.from || { pathname: "/" } }}
              className="text-red-600 font-semibold ml-1"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
