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
      <h1>Update User</h1>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Create</button>
      </form>

      <div>
        <h2 className="text-center text-xl font-bold">Update User</h2>
        <div className="border-2 border-gray-200 rounded-lg text-center">
          {/* {usersData.map((user) => (
            <div key={user.id} className="px-10 space-x-4 grid grid-cols-4 ">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <button className="bg-red-600 rounded px-5 py-2 my-3 hover:bg-red-500">
                Update
              </button>
              <button className="bg-red-600 rounded px-5 py-2 my-3 hover:bg-red-500">
                Delete
              </button>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default page;
