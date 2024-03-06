import React from "react";
import Link from "next/link";
import AllPosts from "./AllPosts";
import Auth from "./Auth";

const Main = () => {
  return (
    <div className="w-4/5 bg-slate-800 p-10 mx-auto">
      <h1 className="text-center font-extrabold text-5xl mb-10">
        Welcome to Post-Its
      </h1>
      <div className="flex justify-center mb-10">
        <Link
          href="/create"
          className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
        >
          Create Post
        </Link>
      </div>
      <div className="">
        <AllPosts />
      </div>
    </div>
  );
};

export default Main;
