"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { email, password };
    axios.post("api/create/login", data).then((res) => {
      console.log(res);
      if (res.data.success === "true") {
        window.location.href = "/blogs";
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center font-bold text-3xl mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
          <Link href={`/signup`} className="text-red-500">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
