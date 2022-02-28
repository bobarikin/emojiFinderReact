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
    <>
      {currentPage > 3 && (
        <button className="btn" onClick={() => setCurrentPage(1)}>
          To first
        </button>
      )}
      <button
        disabled={currentPage === 1}
        className="btn"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </button>
      <ul className="pagination">
        {pageNumbers.slice(startPage, endPage).map((number) => (
          <li className="page-item" key={number}>
            <button className="btn" onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        disabled={currentPage === lastPage}
        className="btn"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>
      {(currentPage <= lastPage - 3) && (
        <button className="btn" onClick={() => setCurrentPage(lastPage)}>
          To last
        </button>
      )}
    </>
  );
}
