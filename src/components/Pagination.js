import React from 'react';

const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => {
  return (
    <div className="pagination">
      <button onClick={onPrev} disabled={currentPage === 1}>
        ← Назад
      </button>
      <span>
        Страница {currentPage} из {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Вперед →
      </button>
    </div>
  );
};

export default Pagination;