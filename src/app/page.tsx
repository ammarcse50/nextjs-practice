"use client";
import React, { useState } from "react";
import axios from "axios";

interface SearchResult {
  id: number;
  name: string;
}

const GoogleAutoComplete = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(suggestions);
  // Fetch suggestions from the backend
  const fetchSuggestions = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get<SearchResult[]>("/api/search", {
        params: { query },
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSuggestions([]);
    } else {
      fetchSuggestions(query);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-600">
        Search Items
      </h1>

      {/* Input Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-3 w-full border rounded-lg mb-4"
        placeholder="Search for items..."
      />

      {/* Suggestions */}
      {loading && <p>Loading...</p>}
      {!loading && suggestions.length > 0 && (
        <ul className="bg-white shadow-lg rounded-lg p-4">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-2 cursor-pointer hover:bg-indigo-100"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GoogleAutoComplete;
