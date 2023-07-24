import React, {useState} from 'react';
import './Search.css';

const Search = ({ searchTerm, onSearch }) => {
  const [searchValue, setSearchValue] = useState(searchTerm);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="search">
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search"
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default Search;
