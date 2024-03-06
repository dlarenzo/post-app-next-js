"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import useAuth from "../src/hooks/useAuth";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../src/firebase";
import { deletePost } from "../src/api/post";
import { useToast } from "@chakra-ui/react";
import AllPostCard from "./AllPostCard";

const AllPosts = () => {
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
  }, [user]);

  const handlePostDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
      toast({
        title: "Post deleted successfully",
        status: "success",
      });
    }
  };

  const handleEditPost = (post) => {
    setEditPost({ ...post }); // Make a copy of the Post Object
  };

  const handleUpdatePost = async () => {
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
    <div>
      {posts.map((post) => (
        <AllPostCard
          key={post.id}
          title={post.title}
          description={post.description}
        />
      ))}
    </div>
  );
};

export default AllPosts;
