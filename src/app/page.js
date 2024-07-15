"use client";

import useAuth from "@/lib/useAuth";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const handelLogout = () => {
    localStorage.removeItem("user");
  };

  console.log(isAuthenticated);

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className=" flex space-x-4">
        {isAuthenticated ? (
          <div>
            <button onClick={handelLogout}>Se déconnecter</button>

            <button> Espace Admin </button>
          </div>
        ) : (
          <div className=" text-2xl space-x-6">
            <Link href={"/register"} > crée un compte </Link>
            <Link href={"/login"}> Login </Link>
          </div>
        )}
      </div>
    </main>
  );
}
