export function Pagination({ lastPage, paginate, currentPage }) {
  const pageNumbers = [];

  for (let i = 1; i <= lastPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <ul className="pagination">
        {pageNumbers
        .filter(number => (number > currentPage - 2) && (number < currentPage + 3))
        .map((number) => (
          <li className="page-item" key={number}>
            <button className="btn" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
