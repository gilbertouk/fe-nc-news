/* eslint-disable react/prop-types */
import "./ArticlesFilters.css";

export function ArticlesFilters({ searchParams, setSearchParams }) {
  function onChangeQuery(event) {
    const newParams = new URLSearchParams(searchParams);
    const { name, value } = event.target;
    newParams.set(name, value);
    setSearchParams(newParams);
  }

  return (
    <div>
      <form>
        <label htmlFor="sort_by">Order by:</label>
        <select
          onChange={onChangeQuery}
          defaultValue=""
          id="sort_by"
          name="sort_by"
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
          onChange={onChangeQuery}
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
