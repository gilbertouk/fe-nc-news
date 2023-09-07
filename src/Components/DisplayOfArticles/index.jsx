import "./DisplayOfArticles.css";
import { ArticlesFilters } from "./ArticlesFilters";
import { ArticleList } from "./ArticleList";
import { PaginationButton } from "./PaginationButton";
import { useSearchParams } from "react-router-dom";

export function DisplayOfArticles() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="display-container">
      <ArticlesFilters
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <ArticleList query={searchParams.toString()} />
      <PaginationButton />
    </div>
  );
}
