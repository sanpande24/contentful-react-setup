import { useState,useEffect } from "react";
import _ from "lodash";
import { createClient } from "../lib/contentful";
import { debounce } from "lodash";


const SearchFilter =({fields }) => { 
   const resources = Object.keys(fields).map(key => ({[key]: fields[key]}))
   console.log(resources)
    //const resources = fields || [];
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredResources, setFilteredResources] = useState(resources);
    const [filters, setFilters] = useState({ type: [], tags: [], dateRange: null });
    const [suggestions, setSuggestions] = useState([]);
  
    useEffect(() => {  
        
      const debouncedSearch = debounce(() => {
        let filtered = resources.filter((field) => {
          const { title, description, resourceType, dateofPublication,tags } = field.fields;
          const matchesSearch =
            title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  
          const matchesFilters =
            (!filters.type.length || filters.type.includes(resourceType)) &&
            (!filters.tags.length || tags.some((tag) => filters.tags.includes(tag))) &&
            (!filters.dateRange || new Date(dateofPublication) >= new Date(filters.dateRange));
  
          return matchesSearch && matchesFilters;
        });
        setFilteredResources(filtered);
      }, 300);
  
      debouncedSearch();
      return () => debouncedSearch.cancel();
    }, [searchTerm, filters, resources]);
  
    useEffect(() => {
      setSuggestions(
        searchTerm
          ? resources.map((r) => r.resources.title).filter((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
          : []
      );
    }, [searchTerm]);
  
    return (
      <div className="container mx-auto p-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
        {suggestions.length > 0 && (
          <ul className="border p-2">
            {suggestions.map((s, index) => (
              <li key={index} onClick={() => setSearchTerm(s)} className="cursor-pointer">
                {s}
              </li>
            ))}
          </ul>
        )}
        <div className="filters mt-4">
          <h3>Filter by Type:</h3>
          {["Whitepapers", "Training", "Webinars"].map((type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={filters.type.includes(type)}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    type: prev.type.includes(type)
                      ? prev.type.filter((t) => t !== type)
                      : [...prev.type, type],
                  }))
                }
              />
              {type}
            </label>
          ))}
        </div>
      </div>
    );
  }
  export default SearchFilter;
  



/*export default function SearchPage({ props }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState(props);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchTerm(query);
    
    const filtered = props?.filter((entry) =>
      entry.fields.title.toLowerCase().includes(query) ||
      entry.fields.description.toLowerCase().includes(query)
    );
    setFilteredEntries(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Page</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 w-full mb-4"
      />
      <ul>
        {filteredEntries?.map((entry) => (
          <li key={entry.sys.id} className="border p-2 mb-2">
            <h2 className="text-xl font-semibold">{entry.fields.title}</h2>
            <p>{entry.fields.description}</p>
            <p className="text-sm text-gray-600">Tags: {entry.fields.tags?.join(", ")}</p>
            <p className="text-sm text-gray-600">Resource Type: {entry.fields.resourceType?.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}*/

