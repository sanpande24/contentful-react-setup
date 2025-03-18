import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';
import { useNavigate } from "react-router-dom";


const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_DELIVERY_TOKEN,
});

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const entries = await client.getEntries({
      query: query, // full-text search across all fields
      //content_type: '<optional_content_type_id>', // optional filter by content type
    });
    setResults(entries.items);
    if (query.trim()) {
        navigate(`/search-page?q=${encodeURIComponent(query)}`);
      }
      else{
        <h1>No Training Document Available</h1>
      }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchBar;


//import ReactDOM from "react-dom/client";import { BrowserRouter, Routes, Route } from "react-router-dom";import Layout from "./pages/Layout";import Home from "./pages/Home";import Blogs from "./pages/Blogs";import Contact from "./pages/Contact";import NoPage from "./pages/NoPage";export default function App() {return (<BrowserRouter><Routes><Route path="/" element={<Layout />}><Route index element={<Home />} /><Route path="blogs" element={<Blogs />} /><Route path="contact" element={<Contact />} /><Route path="*" element={<NoPage />} /></Route></Routes></BrowserRouter>