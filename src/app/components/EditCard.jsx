"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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

const EditCard = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("id"));

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

  const handlePostDelete = async (id) => {
    if (confirm("Are you sure you want to delete this Post?")) {
      deletePost(id);
      toast({ title: "Post deleted successfully", status: "success" });
    }
  };

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
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full bg-black border-4 border-white rounded"
        >
          <div className="p-10">
            <form>
              {editPost && editPost.id === post.id ? (
                <div className="mb-5">
                  <label class="font-extrabold ">Title</label>
                  <input
                    type="text"
                    value={editPost.title}
                    onChange={(e) =>
                      setEditPost({ ...editPost, title: e.target.value })
                    }
                    className="w-full py-1 px-2 text-black bg-white rounded"
                  />
                </div>
              ) : (
                <p>{post.title}</p>
              )}
              {editPost && editPost.id === post.id ? (
                <div className=" flex flex-col mb-5 ">
                  <label className="mb-3 font-extrabold">Edit Your Post</label>
                  <textarea
                    rows="6"
                    cols="50"
                    className="text-black bg-white"
                    value={editPost.description}
                    onChange={(e) =>
                      setPostTodo({ ...editPost, description: e.target.value })
                    }
                  />
                </div>
              ) : (
                <p>{post.description}</p>
              )}
              {editPost && editPost.id === post.id ? (
                <div>
                  <div className="flex justify-center">
                    <Link
                      href="/"
                      onClick={handleUpdate}
                      className=" bg-green-600 px-10 py-2 rounded-full"
                    >
                      Update
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    className=" bg-red-600 px-10 py-2 rounded-full"
                    onClick={() => handleEditPost(post.id)}
                  >
                    Trial
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EditCard;
