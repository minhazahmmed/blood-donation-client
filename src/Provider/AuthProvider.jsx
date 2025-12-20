import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
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
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          setRoleLoading(true);

          const res = await axios.get(
            `http://localhost:5000/users/role/${currentUser.email}`
          );

          setRole(res.data.role);
          setUserStatus(res.data.status);
        } catch (error) {
          console.error("User info fetch error", error);
          setRole("");
          setUserStatus("");
        } finally {
          setRoleLoading(false);
        }
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
    setUser,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
