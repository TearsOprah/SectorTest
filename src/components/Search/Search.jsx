import React from 'react';
import './Search.css';

const Search = ({ searchTerm, onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
