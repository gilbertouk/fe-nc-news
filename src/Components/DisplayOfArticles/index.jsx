import "./DisplayOfArticles.css";
import { ArticlesFilters } from "./ArticlesFilters";
import { ArticleList } from "./ArticleList";
import { PaginationButton } from "./PaginationButton";
import { useSearchParams } from "react-router-dom";

export function DisplayOfArticles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  return (
    <div className="display-container">
      <ArticlesFilters
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <ArticleList
        sortByQuery={sortByQuery}
        orderQuery={orderQuery}
        query={searchParams.toString()}
      />
      <PaginationButton />
    </div>
  );
}
