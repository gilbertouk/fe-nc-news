import "./PaginationButton.css";

export function PaginationButton() {
  return (
    <div className="pagination-container">
      <button className="pagination-button" type="button">
        Previous
      </button>
      <button className="pagination-button" type="button">
        Next
      </button>
    </div>
  );
}
