import React from "react";
import { getAllPosts } from "../services/postApi";
import Link from "next/link";

const page = async () => {
  const postData = await getAllPosts();
  console.log(postData);
  return (
    <div className="grid grid-cols-4 gap-4 p-3">
      <h3 className="text-center text-xl font-bold">All Posts</h3>
      {postData.map((post) => (
        <div key={post.id} className="border  border-lime-700 p-3 ">
          <h2>title: {post.title}</h2>
          <h2>description: {post.body}</h2>

          <button className="px-4 py-2 bg-orange-700">
            <Link href={`/posts/${post.id}`}>View</Link>
          </button>
        </div>
      ))}
    </div>
  );
};

export default page;
