import React from "react";
import Link from "next/link";
import prisma from "@/lib/connectDB";

const Page = async () => {
  try {
    // Fetch user data from Prisma
    const userData = await prisma.user.findMany();
    const userData1 = await prisma.invoices.findMany();

    console.log("invoices",userData1);

    console.log("User data:", userData);

    if (!userData || userData.length === 0) {
      return (
        <div className="p-4">
          <h3 className="text-center text-xl font-bold">No Users Found</h3>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-4 gap-4 p-3">
        <h3 className="text-center text-xl font-bold col-span-4">All Users</h3>
        {userData.map((user) => (
          <div key={user.id} className="border border-lime-700 p-3">
            <h2>Title: {user.name}</h2>
            {user.email ? (
              <h2>Email: {user.email}</h2>
            ) : (
              <h2>No Email Provided</h2>
            )}

            <button className="px-4 py-2 bg-orange-700 text-white">
              <Link href={`/posts/${user.id}`}>View</Link>
            </button>
          </div>
        ))}

        <div>
          <form action="">
            <input type="text" name="name" />
            <input type="text" name="email" />
            <input type="text" name="role" />
          </form>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    return (
      <div className="p-4">
        <h3 className="text-center text-xl font-bold text-red-600">
          Error Loading Users
        </h3>
      </div>
    );
  }
};

export default Page;
