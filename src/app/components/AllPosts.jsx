import React from "react";
import Link from "next/link";

const AllPosts = () => {
  return (
    <div className="w-full bg-slate-400 border-4 border-white rounded">
      <div className="p-10">
        <h3 className="font-extrabold">Title</h3>
        <p className="p-10 mb-10 font-extralight">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit fugiat
          sapiente ratione eaque consectetur totam blanditiis nobis pariatur
          praesentium itaque excepturi id beatae dignissimos officiis minus,
          veniam accusantium quia quos.
        </p>
        <div className="flex justify-center">
          <Link
            href="../edit"
            className="mr-5 bg-yellow-600 px-10 py-2 rounded-full"
          >
            Edit
          </Link>

          <button className=" bg-green-600 px-10 py-2 rounded-full">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
