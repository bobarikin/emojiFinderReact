export function Pagination({ lastPage, setCurrentPage, currentPage }) {
  const pageNumbers = [];

  // следующая страница
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  // предыдущая страница
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <button disabled={currentPage === 1} className="btn" onClick={prevPage}>
        Prev
      </button>
      <ul className="pagination">
        {pageNumbers
          .filter(
            (number) => number > currentPage - 2 && number < currentPage + 3
          ) // изначально создать массив для этого
          .map((number) => (
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
        onClick={nextPage}
      >
        Next
      </button>
    </>
  );
}
