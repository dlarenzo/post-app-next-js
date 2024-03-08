"use client";

import React from "react";
import Link from "next/link";
import AllPosts from "./AllPosts";
import { useToast } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
// import LoginCheckButton from "./LoginCheckButton";

const Main = () => {
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();

  const handleSignInBeforeCreatePost = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You are not logged in",
        description: "Please login to create a post",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log("You are not logged in");
    }
  };

  return (
    <div className="w-4/5 bg-slate-800 p-10 mx-aut text-white">
      <h1 className="text-center text-white font-extrabold text-5xl mb-10">
        Welcome to Post-Its
      </h1>

      <div className="flex justify-center mb-10 text-white">
        {!isLoggedIn ? (
          <Link
            onClick={() => handleSignInBeforeCreatePost()}
            href="/"
            className="mr-5 bg-yellow-600 px-10 py-2 rounded-full text-xl font-bold"
          >
            Create Post
          </Link>
        ) : (
          <Link
            href="/create"
            className="mr-5 bg-yellow-600 px-10 py-2 rounded-full text-xl font-bold"
          >
            Create Post
          </Link>
        )}
      </div>
      <div className="">
        <AllPosts />
      </div>
    </div>
  );
};

export default Main;
