"use client";

import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { addPost } from "../../api/post";
import Link from "next/link";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const Create = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
  }); // [1]

  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const handleChanges = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), post);
      console.log("Document written with ID: ", docRef.id);
      setPost({
        title: "",
        description: "",
      });
      // redirect to home after 2 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
      toast({
        title: "Post created successfully",
        status: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="w-full bg-black pt-24">
        <div className="w-4/5 bg-slate-800 p-10 mx-auto ">
          <div className="w-full bg-black border-4 border-white rounded">
            <div className="p-10">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="mb-3 font-extrabold text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title of your post"
                    className="w-full py-1 px-2 text-black bg-white rounded"
                    value={post.title}
                    onChange={handleChanges}
                  />
                </div>
                <div className=" flex flex-col mb-5 ">
                  <label className="mb-3 font-extrabold text-white">
                    Write It Up!
                  </label>
                  <textarea
                    rows="6"
                    cols="50"
                    name="description"
                    placeholder="Start posting away!"
                    className="text-black py-1 px-2 bg-white rounded"
                    value={post.description}
                    onChange={handleChanges}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit "
                    disabled={
                      post.title.length < 1 ||
                      post.description.length < 1 ||
                      isLoading
                    }
                    className=" bg-blue-600 text-white px-10 py-2 rounded-full"
                  >
                    Post It
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
