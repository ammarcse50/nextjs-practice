"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const GoogleAutoComplete = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  //   const [loading, setLoading] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedQuery = encodeURI(searchQuery);
    console.log(encodedQuery);
    router.push(`/search?q=${encodedQuery}`);
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-600">
        Search Items
      </h1>

      <form onSubmit={onSearch}>
        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-full border rounded-lg mb-4"
          placeholder="Search for items..."
        />
      </form>
    </div>
  );
};

export default GoogleAutoComplete;
