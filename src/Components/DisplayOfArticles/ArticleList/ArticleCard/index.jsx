/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "./ArticleCard.css";

export function ArticleCard({ newArticles }) {
  const navigate = useNavigate();

  function handleArticleToDisplay(article) {
    navigate(`/articles/${article.article_id}`);
  }

  return (
    <>
      {newArticles.map((article) => {
        return (
          <li
            key={article.article_id}
            onClick={() => {
              handleArticleToDisplay(article);
            }}
          >
            <div className="card">
              <img
                src={article.article_img_url}
                alt={`Image from article ${article.title}`}
              />
              <div className="container">
                <h4>
                  <b>{article.title}</b>
                </h4>
                <p>{article.topic}</p>
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
}
