"use client";
import { getUser } from "@/lib/indexDB";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router=useRouter()
  const handelLogin = async (email, password) => {
    const user = await getUser(email);
    if (user && user.password === password) {
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/")

      
      
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-5xl">Login page</h2>

      <div className="flex flex-col space-y-6 mt-6  bg-white  p-12 ">
        <input
          className="px-4 py-2"
          placeholder="email"
          required
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="px-4 py-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => handelLogin(email, password)}> Envoyer </button>
      </div>
    </div>
  );
}

export default Login;
