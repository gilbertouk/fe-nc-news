/* eslint-disable react/prop-types */
import "./ArticlesFilters.css";

export function ArticlesFilters({ searchParams, setSearchParams }) {
  function handleSortBy(event) {
    const newParams = new URLSearchParams();

    newParams.set("sort_by", event.target.value);
    setSearchParams(newParams);
  }

  function handleOrderBy(event) {
    const newParams = new URLSearchParams(searchParams);

    newParams.set("order", event.target.value);
    setSearchParams(newParams);
  }

  return (
    <div>
      <form>
        <label htmlFor="sortBy">Order by:</label>
        <select
          onChange={handleSortBy}
          defaultValue=""
          id="sortBy"
          name="sortBy"
        >
          <option key="selected" value="" disabled hidden>
            Choose here
          </option>
          <option value="created_at">date</option>
          <option value="comment_count">more comments</option>
          <option value="votes">votes</option>
        </select>

        <label htmlFor="order">Order: </label>
        <select
          onChange={handleOrderBy}
          defaultValue=""
          id="order"
          name="order"
        >
          <option key="selected" value="" disabled hidden>
            Choose here
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </form>
    </div>
  );
}
