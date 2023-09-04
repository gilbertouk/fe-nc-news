import "./ArticleList.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllArticles } from "../../../utils/api";
import { ArticleCard } from "./ArticleCard";

export function ArticleList() {
  const [newArticles, setNewArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAllArticles()
      .then((data) => {
        setIsLoading(false);
        setIsError(false);
        setNewArticles(data.articles);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  function handleArticleToDisplay(article) {
    navigate(`/articles/${article.article_id}`);
  }

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Whops, some error here... please reload the page!</p>;

  return (
    <ul className="card-list">
      <ArticleCard
        newArticles={newArticles}
        handleArticleToDisplay={handleArticleToDisplay}
      />
    </ul>
  );
}
