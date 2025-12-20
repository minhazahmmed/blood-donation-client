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
  const[role, setRole] = useState('')

  const provider = new GoogleAuthProvider();

  //   Register Function
  const registerWithEmailPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //   Login Function
  const loginWithEmailPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Signin / Signup
  const googleSignin = () => {
    return signInWithPopup(auth, provider);
  };


 






useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    if (currentUser?.email) {
      try {
        const res = await axios.get(
          `http://localhost:5000/users/role/${currentUser.email}`
        );
        setRole(res.data.role);
      } catch (error) {
        console.error("Role fetch error", error);
      }
    } else {
      setRole('');
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);





  console.log(role);
  
  const authdata = {
  registerWithEmailPassword,
  user,
  role,
  setUser,
  loginWithEmailPassword,
  googleSignin,
  loading,
  };

  return (
    <AuthContext.Provider value={authdata}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
