import { useState, useEffect } from "react";
import { getArticleById } from "../../utils/api";
import "./DisplayOneArticle.css";
import { useParams } from "react-router-dom";
import { DisplayArticleComments } from "./DisplayArticleComments";

export function DisplayOneArticle() {
  const [currentArticle, setCurrentArticle] = useState({
    author: "",
    title: "",
    topic: "",
    body: "",
    created_at: "",
    votes: "",
    article_img_url: "",
    comment_count: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ article }) => {
        setIsLoading(false);
        setIsError(false);
        setCurrentArticle(article);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Whops, some error here... please reload the page!</p>;

  return (
    <div className="display--article">
      <h3>{currentArticle.title}</h3>
      <img
        src={currentArticle.article_img_url}
        alt={`Image from article ${currentArticle.title}`}
      />
      <p>Author: {currentArticle.title}</p>
      <p>Topic: {currentArticle.topic}</p>
      <p>{currentArticle.body}</p>
      <p>
        Created at{" "}
        {currentArticle.created_at
          ? new Date(currentArticle.created_at)
              .toJSON()
              .slice(0, 10)
              .split("-")
              .reverse()
              .join("/")
          : ""}
      </p>
      <p>Votes: {currentArticle.votes}</p>
      <p>Total comments: {currentArticle.comment_count}</p>

      <div className="display--article--comments">
        <ul className="display--article--comments--list">
          <DisplayArticleComments article_id={article_id} />
        </ul>
      </div>
    </div>
  );
}
