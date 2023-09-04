import "./DisplayOfArticles.css";
import { ArticlesFilters } from "./ArticlesFilters";
import { ArticleList } from "./ArticleList";
import { PaginationButton } from "./PaginationButton";

export function DisplayOfArticles() {
  return (
    <div className="display-container">
      <ArticlesFilters />
      <ArticleList />
      <PaginationButton />
    </div>
  );
}
