import React from 'react';
import { observer } from 'mobx-react';
import postStore from "../../stores/PostStore.js";
import TableRow from "../TableRow/TableRow.jsx";

const Table = observer(() => {
  const { currentData, sortBy, sortDirection, searchTerm, setSearchTerm, setSortBy } = postStore;

  const handleSortBy = (column) => {
    if (sortBy === column) {
      postStore.setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      postStore.setSortBy(column);
      postStore.setSortDirection('asc');
    }
  };

  const handleSearch = (event) => {
    postStore.setSearchTerm(event.target.value);
  };

  const getSortSymbol = (column) => {
    if (sortBy === column) {
      return sortDirection === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>;
    }
    // Если sortBy не определено, считаем, что сортировка по этому столбцу не выбрана, и отображаем стрелку вниз.
    return <span>&darr;</span>;
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search"
        />
      </div>
      <table className="table">
        {/* Table header */}
        <thead>
        <tr>
          <th onClick={() => handleSortBy('id')}>
            ID {getSortSymbol('id')}
          </th>
          <th onClick={() => handleSortBy('title')}>
            Title {getSortSymbol('title')}
          </th>
          <th onClick={() => handleSortBy('body')}>
            Описание {getSortSymbol('body')}
          </th>
        </tr>
        </thead>
        {/* Table body */}
        <tbody>
        {currentData.map((post) => (
          <TableRow key={post.id} post={post} />
        ))}
        </tbody>
      </table>
    </>
  );
});

export default Table;
