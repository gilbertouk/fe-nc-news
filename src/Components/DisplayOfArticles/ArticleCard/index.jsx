import "./ArticleCard.css";
import { getAllArticles } from "../../../utils/api";
import { useState } from "react";
import { useEffect } from "react";

export function ArticleCard() {
  const [newArticles, setNewArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then((data) => {
      console.log(data);
      setNewArticles(data.articles);
    });
  }, []);

  return (
    <ul className="card-list">
      {" "}
      {newArticles.map((article) => {
        return (
          <li key={article.article_id}>
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
    </ul>
  );
}
