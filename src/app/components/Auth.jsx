"use client";
import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";

const Auth = () => {
  const { isLoggedIn, user } = useAuth();
  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        //Google Access Token. Google API
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        //The signed-in user info.
        const user = result.user;
      })
      .catch((error) => {
        //Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        //The email of the user's account used.
        const email = error.customData.email;
        //The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div className="fixed bg-black w-full p-5 border-b border-slate-500 flex justify-between items-center">
      <div>
        {isLoggedIn && (
          <>
            <p className="text-white mb-4 ">Welcome, {user.email}</p>
            <Link
              href="/"
              className="text-white border border-red-600 bg-red-600 rounded-full py-1 px-6 font-extrabold"
              onClick={() => auth.signOut()}
            >
              {" "}
              Logout
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <button
            onClick={() => handleAuth()}
            className="w-auto bg-white flex items-center px-10 py-3 border border-slate-800 rounded"
          >
            {" "}
            <FaGoogle className="mr-5" />
            Login With Google
          </button>
        )}
      </div>
      <Link
        href="/"
        className="font-extrabold text-xl bg-blue-600 px-10 py-2 rounded-full"
      >
        Home
      </Link>
    </div>
  );
};

export default Auth;
