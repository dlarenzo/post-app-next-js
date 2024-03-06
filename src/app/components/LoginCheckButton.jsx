"use client";
import React from "react";
import Link from "next/link";

import { useToast } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";

const LoginCheckButton = () => {
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
      <Link
        onClick={() => handleSignInBeforeCreatePost}
        href="/"
        className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
      >
        Create Post
      </Link>;
      // console.log("You are not logged in");
    } else {
      <Link
        href="/create"
        className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
      >
        Create Post
      </Link>;
    }
    return (
      <div className="flex justify-center mb-10">
        {!isLoggedIn ? (
          <Link
            onClick={() => handleSignInBeforeCreatePost}
            href="/"
            className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
          >
            Create Post
          </Link>
        ) : (
          <Link
            href="/create"
            className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
          >
            Create Post
          </Link>
        )}
        {/* <Link
          onClick={() => handleSignInBeforeCreatePost()}
          href="/create"
          className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
        >
          Create Post
        </Link> */}
      </div>
    );
  };
};

export default LoginCheckButton;

const handleSignInBeforeCreatePost = async () => {
  if (!isLoggedIn) {
    toast({
      title: "You are not logged in",
      description: "Please login to create a post",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    // console.log("You are not logged in");
  }
  return (
    <div>
      {!isLoggedIn ? (
        <Link href="/" className="mr-5 bg-yellow-600 px-10 py-2 rounded-full">
          Create Post
        </Link>
      ) : (
        <Link
          href="/create"
          className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
        >
          Create Post
        </Link>
      )}
    </div>
  );
};
