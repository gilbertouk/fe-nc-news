import "./DisplayOfArticles.css";
import { ArticlesFilters } from "./ArticlesFilters";
import { ArticleCard } from "./ArticleCard";
import { PaginationButton } from "./PaginationButton";

export function DisplayOfArticles() {
  return (
    <div className="display-container">
      <ArticlesFilters />
      <ArticleCard />
      <PaginationButton />
    </div>
  );
}
