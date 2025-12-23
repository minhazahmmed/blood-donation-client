import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const provider = new GoogleAuthProvider();

  // Register
  const registerWithEmailPassword = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const loginWithEmailPassword = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleSignin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  // Logout 
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update Profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // এই ফাংশনটি ইউজার ডাটাবেজ থেকে রোল এবং স্ট্যাটাস আনবে
  const fetchUserInfo = async (email) => {
    try {
      setRoleLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/role/${email}`
      );
      setRole(res.data.role || "donor"); // ডিফল্ট ভ্যালু হিসেবে donor সেট করা
      setUserStatus(res.data.status || "active"); // ডিফল্ট ভ্যালু হিসেবে active সেট করা
    } catch (error) {
      console.error("User info fetch error", error);
    } finally {
      setRoleLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        // ডাটাবেজ থেকে রোল ও স্ট্যাটাস ফেচ করা
        await fetchUserInfo(currentUser.email);
      } else {
        setRole("");
        setUserStatus("");
        setRoleLoading(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authData = {
    user,
    role,
    userStatus,
    loading,
    roleLoading,
    registerWithEmailPassword,
    loginWithEmailPassword,
    googleSignin,
    logOut,
    setUser,
    updateUserProfile,
    fetchUserInfo, // এটি এক্সপোর্ট করা হলো যাতে রেজিস্টার পেজ থেকে সরাসরি কল করা যায়
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;