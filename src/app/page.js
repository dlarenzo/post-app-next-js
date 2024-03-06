import Image from "next/image";
import Main from "./components/Main";
import AllPosts from "./components/AllPosts";
import Create from "./components/Create";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Main />
    </main>
  );
}
