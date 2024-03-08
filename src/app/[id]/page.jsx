"use client";

import React from "react";

const page = ({ params }) => {
  const id = params.id;
  console.log(id);
  return (
    <div>
      <div className="pt-24 text-black">page</div>
    </div>
  );
};

export default page;
