"use client";
import React, { useState } from "react";
import axios from "axios";

interface SearchResult {
  id: number;
  name: string;
  category: string;
}

const CategoryAutoComplete = () => {
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

  // Handle suggestion selection
  const handleSuggestionClick = (name: string) => {
    setSearchQuery(name); // Set the selected suggestion in the input field
    setSuggestions([]); // Clear the suggestions list
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-600">
        Search Items by Category
      </h1>

      {/* Input Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-3 w-full border rounded-lg mb-4"
        placeholder="Search for items or categories..."
      />

      {/* Suggestions */}
      {loading && <p>Loading...</p>}
      {!loading && suggestions.length > 0 && (
        <ul className="bg-white shadow-lg rounded-lg p-4">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-2 cursor-pointer hover:bg-indigo-100"
              onClick={() => handleSuggestionClick(suggestion.name)} // Handle click event
            >
              <span className="font-bold">{suggestion.name}</span> (
              {suggestion?.item_category?.title || ""})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryAutoComplete;
