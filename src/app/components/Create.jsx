import React from "react";
import Link from "next/link";

const Create = () => {
  return (
    <div className="w-4/5 bg-slate-800 p-10 mx-auto mt-24">
      <h1 className="text-center font-extrabold text-5xl mb-10">
        Create Your Post
      </h1>
      <div className="w-full bg-slate-400 border-4 border-white rounded">
        <div className="p-10">
          <form>
            <div className="mb-5">
              <label class="font-extrabold ">Title</label>
              <input
                type="text"
                placeholder="Name your post"
                className="w-full py-1 text-black"
              />
            </div>
            <div className=" flex flex-col mb-5 ">
              <label className="mb-3 font-extrabold">Write It Up!</label>
              <textarea rows="6" cols="50" className="text-black" />
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
  );
};

export default Create;
