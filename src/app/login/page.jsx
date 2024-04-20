/* eslint-disable react/no-unescaped-entities */
"use client";
// import 'bootstrap/dist/css/bootstrap.css';

import Link from 'next/link';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 animate-fade-in">
      <div className="bg-white shadow-xl rounded-lg p-8 border-t-4 border-blue-500 transition-all duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Your Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="row">
            <div className="col-md-12"> <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
          /></div>
            <div className="col-md-12">
            <input
            className="w-full"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
          />
            </div>
            <div className="col-md-12">
            <button className="">
            Login
          </button>
            </div>
          </div>
         
          
        
          {error && (
            <div className="text-center text-white bg-red-500 rounded-md p-2">
              {error}
            </div>
          )}

          <p className="text-sm text-center mt-6">
            Don't have an account?{" "}
            {/* <Link href="/register">
              <a className="underline text-blue-500 hover:text-blue-600 transition duration-300">
                Register
              </a>
            </Link> */}
          </p>
        </form>
      </div>
    </div>
  );
}
