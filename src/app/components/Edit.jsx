"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Edit = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const { user } = useAuth();
  const toast = useToast();

  const refreshData = () => {
    if (!user) {
      setPosts([]);
      return;
    }
    const q = query(collection(db, "post"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapshot) => {
      const ar = [];
      querySnapshot.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setPosts(ar);
    });
  };

  useEffect(() => {
    refreshData();
  });

  const handleEditPost = (post) => {
    setEditPost({ ...post }); // Make a copy of the post object
  };

  const handleUpdate = async () => {
    if (!editPost) return;

    await updateDoc(doc(db, "post", editPost.id), {
      title: editPost.title,
      description: editPost.description,
    });

    toast({ title: "Post updated successfully", status: "success" });
    setEditPost(null);
    refreshData();
  };

  return (
    <div className="bg-slate-800  flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-4/5 bg-slate-800 p-10 mx-auto ">
        <h1 className="text-center font-extrabold text-5xl mb-10">
          Update Your Post
        </h1>
        <div className="w-full bg-black border-4 border-white rounded">
          <div className="p-10">
            <form>
              <div className="mb-5">
                <label className="mb-3 font-extrabold text-white">Title</label>
                <input
                  type="text"
                  placeholder="Name your post"
                  className="w-full py-1 px-2 text-black bg-white rounded"
                />
              </div>
              <div className=" flex flex-col mb-5 ">
                <label className="mb-3 font-extrabold">Write It Up!</label>
                <textarea rows="6" cols="50" className="text-black bg-white" />
              </div>
              <div className="flex justify-center">
                <button className=" bg-green-600 px-10 py-2 rounded-full">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
