"use client";

import React, { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";

const EditPost = ({ params }) => {
  const id = params.id;

  console.log(id);

  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const toast = useToast();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setEditPost(docSnap.data());
      } else {
        console.log("No such document!");
        return;
      }

      await updateDoc(docRef, {
        title: editPost.title,
        description: editPost.description,
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
      toast({ title: "Post updated successfully", status: "success" });
      setEditPost(null);
      refreshData();
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    const fetchPosts = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setEditPost(docSnap.data());

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("doc doesn't exist");
      }
    };
    fetchPosts(); // Call the function to fetch the post data
  }, [id]); // Add id as a dependency to the useEffect hook

  return (
    <div>
      <div className="w-4/5 bg-slate-800 p-10 mx-auto ">
        <h1 className="text-center font-extrabold text-5xl mb-10">
          Update Your Post
        </h1>
        <div className="w-full bg-black border-4 border-white rounded">
          <div className="p-10">
            <form onSubmit={handleUpdate}>
              <div className="mb-5">
                <label className="mb-3 font-extrabold text-white">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Title of your post"
                  className="w-full py-1 px-2 text-black bg-white rounded"
                  value={editPost?.title}
                  onChange={(e) =>
                    setEditPost({ ...editPost, title: e.target.value })
                  }
                />
              </div>
              <div className=" flex flex-col mb-5 ">
                <label className="mb-3 font-extrabold text-white">
                  Write It Up!
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Description of your post"
                  className="text-black py-1 px-2 bg-white rounded"
                  value={editPost?.description}
                  onChange={(e) =>
                    setEditPost({ ...editPost, description: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className=" bg-blue-600 text-white px-10 py-2 rounded-full"
                >
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

export default EditPost;

// const id = params.id;
//   console.log(id);

//   const [posts, setPosts] = useState([]);
//   const [editPost, setEditPost] = useState(null);
//   const toast = useToast();

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const docRef = await updateDoc(db, "posts", id);
//       const docSnap = await getDocs(docRef);
//       setEditPost(docSnap.data());

//       if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//       } else {
//         console.log("doc doesn't exist");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     if (!editPost) return;

//     await updateDoc(doc(db, "post", editPost.id), {
//       title: editPost.title,
//       description: editPost.description,
//     });

//     toast({ title: "Post updated successfully", status: "success" });
//     setEditPost();
//     refreshData();
//   };

//   useEffect(() => {
//     const fetchPosts = async () => {
//       const docRef = doc(db, "posts", id);
//       const docSnap = await getDocs(docRef);
//       setEditPost(docSnap.data());

//       if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//       } else {
//         console.log("doc doesn't exist");
//       }
//     };
//     fetchPosts(); // Call the function to fetch the post data
//   }, [id]); // Add id as a dependency to the useEffect hook
