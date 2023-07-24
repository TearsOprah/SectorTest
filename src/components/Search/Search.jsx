import React, { useState } from 'react';
import './Search.css';

const Search = ({ searchTerm, onSearch }) => {
  const [searchValue, setSearchValue] = useState(searchTerm);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Поиск"
      />
      <button className="search__button hovered" onClick={handleSearch}></button>
    </div>
  );
};

export default Search;
