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
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";

const AllPostCard = ({ params }) => {
  const [posts, setPosts] = useState([]);
  // const [editPost, setEditPost] = useState(null);
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();

  const handlePostDelete = async (id) => {
    if (confirm("Are you sure you want to delete this post?")) {
      //create const a reference choose own name
      //doc refers to firebase document
      //db refers to firebase database
      //posts refers to the collection
      //id refers to the id of the document
      const postRef = doc(db, "posts", id);
      //await refers to the promise of the deleteDoc function
      //deleteDoc refers to the function that deletes the document
      //postRef refers to the reference of the document
      await deleteDoc(postRef);
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      toast({ title: "Post deleted successfully", status: "success" });
      refreshData(); // Refresh the data after deleting a post
    }
  };

  const refreshData = () => {
    if (!user) {
      //setPosts refers to the function that sets the state of the posts
      setPosts([]);
      return;
    }
    const q = query(collection(db, "posts"));
    onSnapshot(q, (querySnapshot) => {
      const ar = [];
      querySnapshot.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setPosts(ar);
    });
  };

  //useEffect refers to the function that runs after the component renders
  useEffect(() => {
    const fetchPosts = async () => {
      //try refers to the block of code to be tested for errors
      try {
        //const refers to the promise of the getDocs function
        //getDocs refers to the function that fetches the documents
        //postCollection refers to the reference of the collection
        //db refers to the firebase database
        //posts refers to the collection set up in firebase
        const postCollection = collection(db, "posts");
        const snapshot = await getDocs(postCollection);
        const postData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postData);
        console.log("Posts: ", postData);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div
          key={post.id}
          className="w-full bg-black border-4 border-white rounded mb-5"
        >
          <div className="p-10">
            <h3 className="text-white pb-3 font-extrabold text-lg">Title</h3>
            <p className="py-1 px-2 bg-white text-black rounded mb-5 font-extralight">
              {post.title}
            </p>
            <h3 className="text-white pb-3 font-extrabold text-lg">Post</h3>
            <p className="py-1 px-2 mb-10 bg-white text-black rounded font-extralight">
              {post.description}
            </p>
            <div className="flex justify-center">
              <button
                // href="/edit/1"

                onClick={() =>
                  router.push(`/post/${post.id}`, {
                    id: post.id,
                    title: post.title,
                    description: post.description,
                  })
                }
                className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
              >
                Edit
              </button>

              <button
                type="submit"
                className=" bg-red-600 px-10 py-2 rounded-full"
                onClick={() => handlePostDelete(post.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPostCard;
