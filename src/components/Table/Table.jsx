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
      return sortDirection === 'asc' ? <span className="arrow arrow_reverse"></span> : <span className="arrow"></span>;
    }
    // Если sortBy не определено, считаем, что сортировка по этому столбцу не выбрана, и отображаем стрелку вниз.
    return <span className="arrow"></span>;
  };

  // Заполняем массив currentData пустыми объектами, чтобы всегда отображать 10 строк
  const filledData = Array.from({ length: 10 }, (_, index) => currentData[index] || {});

  return (
    <>
      <Search searchTerm={searchTerm} onSearch={handleSearch} />
      {
        currentData.length >= 1 ?
          <table className="table">
            {/* Table header */}
            <thead>
            <tr className="table__header">
              <th className="table__header-column header-id hovered" onClick={() => handleSortBy('id')}>
                ID {getSortSymbol('id')}
              </th>
              <th className="table__header-column header-title hovered" onClick={() => handleSortBy('title')}>
                Заголовок {getSortSymbol('title')}
              </th>
              <th className="table__header-column header-body hovered" onClick={() => handleSortBy('body')}>
                Описание {getSortSymbol('body')}
              </th>
            </tr>
            </thead>
            {/* Table body */}
            <tbody className='table__body'>
            {filledData.map((post, index) => (
              <TableRow key={index} post={post} />
            ))}
            </tbody>
          </table>
          :
          <div className={'no-matches-block'}>
            <p className={'no-matches-block__title'}>Совпадений не найдено</p>
            <a className={'no-matches-block__link hovered'} href={'/'}>Назад</a>
          </div>
      }

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
