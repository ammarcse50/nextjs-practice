"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : "";

  const encodedQuery = encodeURI(searchQuery || "");

  console.log("search", encodedQuery);

  return <div>SearchPage</div>;
};

export default SearchPage;
