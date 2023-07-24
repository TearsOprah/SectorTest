import React from 'react';
import { observer } from 'mobx-react';
import postStore from "../../stores/PostStore.js";
import TableRow from "../TableRow/TableRow.jsx";

const Table = observer(() => {
  const { currentData, sortBy, setSearchTerm, setSortBy } = postStore;

  const handleSortBy = (column) => {
    postStore.setSortBy(column);
  };

  return (
    <table className="table">
      {/* Table header */}
      <thead>
      <tr>
        <th onClick={() => handleSortBy('id')}>
          ID {sortBy === 'id' && <span>&darr;</span>}
        </th>
        <th onClick={() => handleSortBy('title')}>
          Title {sortBy === 'title' && <span>&darr;</span>}
        </th>
        <th onClick={() => handleSortBy('body')}>
          Описание {sortBy === 'body' && <span>&darr;</span>}
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
  );
});

export default Table;
