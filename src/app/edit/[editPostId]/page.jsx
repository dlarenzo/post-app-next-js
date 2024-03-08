"use client";
import React from "react";
import { useParams } from "next/navigation";
import EditCard from "../../components/EditCard";

const EditPage = () => {
  const { id, name } = useParams();

  return (
    <div className="text-black py-24">
      Hello World
      {console.log({ id, name })}
    </div>
  );
};

export default EditPage;
