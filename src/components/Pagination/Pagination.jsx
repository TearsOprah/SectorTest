import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      navigate(`/page/${currentPage - 1}`); // Обновляем адрес при переключении страницы
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      navigate(`/page/${currentPage + 1}`); // Обновляем адрес при переключении страницы
    }
  };

  return (
    <div className="pagination">
      <button className='page-nav-button' onClick={handlePrevPage}>Назад</button>
      <div className='page-number-buttons-list'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-number-button ${currentPage === index + 1 ? 'button_active' : ''}`}
            onClick={() => {
              onPageChange(index + 1);
              navigate(`/page/${index + 1}`); // Обновляем адрес при переключении страницы
            }}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button className='page-nav-button' onClick={handleNextPage}>Далее</button>
    </div>
  );
};

export default Pagination;
