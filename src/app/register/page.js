"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addUser, getUser } from "@/lib/indexDB";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async (email, password) => {
    try {
      const user = await getUser(email);
      if (!user) {
        const newUser = { email, password };
        await addUser(newUser);
        // setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        throw new Error("User already exists");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="h-screen">
        <form className="flex space-x-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </main>
  );
}
