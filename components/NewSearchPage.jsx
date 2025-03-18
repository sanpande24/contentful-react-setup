/*import React, { useState, useEffect } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_DELIVERY_TOKEN,
});

function NewSearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const entries = await client.getEntries({
      query: query, // full-text search across all fields
      //content_type: '<optional_content_type_id>', // optional filter by content type
    });
    setResults(entries.items);
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

      <ul>
        {results.map((item) => (
          <li key={item.sys.id}>{item.fields.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default NewSearchPage;*/
import React, { useState } from 'react';
import { createClient } from 'contentful';
import { useLocation } from "react-router-dom";



const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_DELIVERY_TOKEN,
  environment : process.env.NEXT_PUBLIC_ENVIRONMENT,
});

const NewSearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    whitepapers: false,
    webinars: false,
    blogs: false,
  });

  const handleCheckboxChange = async (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.checked,
    });
  };

  const handleSearch = async () => {
    // Build tag filters based on selected checkboxes
    const selectedTags = Object.keys(filters).filter((key) => filters[key]);
    
    // Construct query parameters
    let queryParams = {
      query: query, // full-text search
      limit: 50, // Adjust as needed
    };

    if (selectedTags.length > 0) {
      // Filter by tags using 'metadata.tags.sys.id[in]'
      queryParams['metadata.tags.sys.id[in]'] = selectedTags.join(',');
    }

    try {
      const entries = await client.getEntries(queryParams);
      setResults(entries.items);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  return (
    <div className="flex">
      <aside className="w-1/4 p-4 bg-gray-100">
      <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-4 p-2 border rounded-lg shadow-sm"
      />

      </div>
      <h3 className="font-semibold mb-2">Resource Type:</h3>
        <ul>
        <li>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="whitepapers"
            checked={filters.whitepapers}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Whitepapers
        </label>
        </li>
        <li>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="webinars"
            checked={filters.webinars}
            onChange={handleCheckboxChange}
            className="mr-2"
            />
          Webinars
        </label>
        </li>
        <li>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="trainings"
            checked={filters.trainings}
            onChange={handleCheckboxChange}
            className="mr-2"
            />
          Trainings
        </label>
        </li>
        </ul>

      <button className="bg-yellow-500 hover:bg-yellow-700 px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none" color='blue' style={{ marginTop: '10px'}}onClick={handleSearch}>
        Search
      </button>
      </aside>
      
      <main className="w-3/4 p-4">
      <h2>Search Results</h2>
      <div className="grid grid-cols-3 gap-4">
        
        {results.map((item) => (
          <div key={item.sys.id} className="p-4 border rounded">
            <a href={item.fields.urlDownloadLink}>{item.fields.title}<img src={item.fields.thumbnailCoverImage?.fields?.file?.url}></img></a> ({item.metadata.tags.map(tag => tag.sys.id).join(', ')})
          </div>
        ))}
        </div>
      </main>
      </div>
  );
};

export default NewSearchPage;