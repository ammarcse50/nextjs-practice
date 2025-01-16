"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import bcrypt from "bcryptjs";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hashpassword = await bcrypt.hash(password, 10);

    const data = { name, email, password: hashpassword };
    axios.post("/api/create", data).then((res) => {
      console.log(res);
      if (res.data.success === "true") {
        window.location.href = "/login";
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-center font-bold text-3xl mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
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
            signup
          </button>
          <Link className="text-red-500" href={`/login`}>
            {" "}
            login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
