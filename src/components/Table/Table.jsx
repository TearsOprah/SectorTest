import React, {useEffect} from 'react';
import { observer } from 'mobx-react';
import postStore from "../../stores/PostStore.js";
import TableRow from "../TableRow/TableRow.jsx";
import './Table.css';
import {useNavigate, useParams} from "react-router-dom";
import Search from "../Search/Search.jsx";
import Pagination from "../Pagination/Pagination.jsx";

const Table = observer(() => {
  const { currentData, sortBy, sortDirection, searchTerm, setSearchTerm, setSortBy, totalPages, currentPage, setCurrentPage } = postStore;

  const { page } = useParams();
  const navigate = useNavigate();

  console.log(currentPage)

  useEffect(() => {
    // Устанавливаем текущую страницу из параметра page при первоначальной загрузке компонента
    const pageNumber = parseInt(page) || 1;
    postStore.setCurrentPage(pageNumber);
  }, [page]);

  const handleSortBy = (column) => {
    if (sortBy === column) {
      postStore.setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      postStore.setSortBy(column);
      postStore.setSortDirection('asc');
    }
    handlePageChange(1)
  };

  const handleSearch = (value) => {
    postStore.setSearchTerm(value);
    handlePageChange(1)
  };

  const handlePageChange = (page) => {
    postStore.setCurrentPage(page);
    navigate(`/page/${page}`); // Обновляем адрес при переключении страницы
  };

  const getSortSymbol = (column) => {
    if (sortBy === column) {
      return sortDirection === 'asc' ? <span>&uarr;</span> : <span>&darr;</span>;
    }
    // Если sortBy не определено, считаем, что сортировка по этому столбцу не выбрана, и отображаем стрелку вниз.
    return <span>&darr;</span>;
  };

  // Заполняем массив currentData пустыми объектами, чтобы всегда отображать 10 строк
  const filledData = Array.from({ length: 10 }, (_, index) => currentData[index] || {});


  return (
    <>
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
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
        {filledData.map((post, index) => (
          <TableRow key={index} post={post} />
        ))}
        </tbody>
      </table>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
});

export default Table;
