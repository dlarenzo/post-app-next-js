"use client";

import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { addPost } from "../../api/post";
import Link from "next/link";

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();

  const handleCreatePost = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You are not logged in",
        description: "Please login to create a post",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    const post = {
      title,
      description,
      userId: user.uid,
    };
    await addPost(post);
    setIsLoading(false);
    setTitle("");
    setDescription("");
    toast({ title: "Post created successfully", status: "success" });
  };

  return (
    <div className="">
      <div className="w-4/5 bg-slate-800 p-10 mx-auto ">
        <h1 className="text-center font-extrabold text-5xl my-10">
          Create Your Post
        </h1>
        <div className="w-full bg-slate-400 border-4 border-white rounded">
          <div className="p-10">
            <form>
              <div className="mb-5">
                <label class="font-extrabold ">Title</label>
                <input
                  type="text"
                  placeholder="Title of your post"
                  className="w-full py-1 text-black"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className=" flex flex-col mb-5 ">
                <label className="mb-3 font-extrabold">Write It Up!</label>
                <textarea
                  rows="6"
                  cols="50"
                  className="text-black"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => handleCreatePost()}
                  disabled={
                    title.length < 1 || description.length < 1 || isLoading
                  }
                  className=" bg-green-600 px-10 py-2 rounded-full"
                >
                  <Link href="/">Post It</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
