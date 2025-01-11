// /pages/users/create.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usersData, setUsersData] = useState([]);
  console.log("usersdata", usersData);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/read");
      const data = await res.json();
      console.log("data", data);
      setUsersData(data);
    };

    getUsers();
  }, []);

  const handleDelete = async (id: number) => {
    console.log("id", id);
    console.log("handle delete called");
    try {
      const res = await fetch(`/api/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ success: true }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("User deleted successfully!");
        setUsersData(usersData.filter((user) => user.id !== id));
      } else {
        alert("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
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
      <h1>Create User</h1>
      <form onSubmit={handleCreate}>
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
        <button className="px-4 py-2 bg-green-400" type="submit">
          create
        </button>
      </form>

      <div>
        <h2 className="text-center text-xl font-bold">All Users</h2>
        <div className="border-2 border-gray-200 rounded-lg text-center">
          {usersData.map((user) => (
            <div key={user.id} className="px-10 space-x-4 grid grid-cols-4 ">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <button className="bg-red-600 rounded px-5 py-2 my-3 hover:bg-red-500">
                <Link href={`/users/${user.id}`}> Update</Link>
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-600 rounded px-5 py-2 my-3 hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
