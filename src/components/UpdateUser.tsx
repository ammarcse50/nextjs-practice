"use client";
import React, { useState } from "react";

const page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id } = await params;
    console.log("id of update", id);
    try {
      const res = await fetch(`/api/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      // const data = await res.json();
      if (res.ok) {
        alert("User created successfully!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert("Error creating user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <div>
      <h1 className="text-center font-bold text-3xl">Update User</h1>
      <form onSubmit={handleUpdate} className="mx-auto ">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="px-4 py-2 bg-green-400">Update</button>
      </form>

      <div>
        <h2 className="text-center text-xl font-bold">Update User</h2>
      </div>
    </div>
  );
};

export default page;
