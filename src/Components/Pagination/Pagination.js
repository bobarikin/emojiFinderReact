export function Pagination({
  lastPage,
  setCurrentPage,
  currentPage,
  startPage,
  endPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {currentPage > 3 && (
        <button className="button-navigate" onClick={() => setCurrentPage(1)}>
          To first
        </button>
      )}
      <button
        disabled={currentPage === 1}
        className="button-navigate"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      <ul className="pagination">
        {pageNumbers.slice(startPage, endPage).map((number) => (
          <li className="page-item" key={number}>
            <button
              className={
                currentPage === number
                  ? "button-navigate active-page"
                  : "button-navigate"
              }
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        disabled={currentPage === lastPage}
        className="button-navigate"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
      {currentPage <= lastPage - 3 && (
        <button
          className="button-navigate"
          onClick={() => setCurrentPage(lastPage)}
        >
          To last
        </button>
      )}
    </div>
  );
}
