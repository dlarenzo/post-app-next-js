import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addPost = async ({ userId, title, description }) => {
  try {
    await addDoc(collection(db, "post"), {
      user: userId,
      title: title,
      description: description,
      createdAt: new Date().getTime(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const editPost = async ({ userId, title, description }) => {
  try {
    const postRef = doc(db, "post", docId);
    await updateDoc(postRef, {
      userId,
      title,
      description,
    });
  } catch (err) {
    console.log(err);
  }
};

const deletePost = async (docId) => {
  try {
    const postRef = doc(db, "post", docId);
    await deleteDoc(postRef);
  } catch (err) {
    console.log(err);
  }
};

export { addPost, editPost, deletePost };
