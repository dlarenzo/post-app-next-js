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

// import { useRouter } from "next/navigation";

// export default function Page() {
//   //router is a hook that is used to navigate between pages
//   const router = useRouter(); // Use the useRouter hook

//   // Check if router is ready before destructuring
//   const { id } = router.isReady ? router.query : {};

//   console.log(id);

//   return (
//     <div className=" text-black pt-24">
//       <div>
//         <h1>Can you see {id}</h1>
//       </div>
//     </div>
//   );
// }
