
import prisma from "@/lib/connectDB";
import { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      console.log(newUser);
      alert("User created successfully!");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <h1>Create User</h1>
    
    </div>
  );
}
