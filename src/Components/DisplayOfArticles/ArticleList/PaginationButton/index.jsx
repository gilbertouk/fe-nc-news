/* eslint-disable react/prop-types */
import "./PaginationButton.css";

export function PaginationButton({
  page,
  setPage,
  totalPages,
  setSearchParams,
  searchParams,
}) {
  function onChangeQuery(page) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", page);
    setSearchParams(newParams);
  }

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        type="button"
        onClick={() => {
          onChangeQuery(page - 1);
          setPage((currentPage) => currentPage - 1);
        }}
        disabled={page === 1}
      >
        Back
      </button>
      <button
        className="pagination-button"
        type="button"
        onClick={() => {
          onChangeQuery(page + 1);
          setPage((currentPage) => currentPage + 1);
        }}
        disabled={page >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
