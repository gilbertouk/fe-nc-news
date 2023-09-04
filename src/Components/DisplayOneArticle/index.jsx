import { useState, useEffect } from "react";
import { getArticleById } from "../../utils/api";
import "./DisplayOneArticle.css";
import { useParams } from "react-router-dom";

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
    <div>
      <h2>Article Details</h2>
      <form className="form-article">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={currentArticle.author}
          readOnly={true}
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={currentArticle.title}
          readOnly={true}
        />

        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={currentArticle.topic}
          readOnly={true}
        />

        <label htmlFor="body">Article body:</label>
        <input
          type="text"
          id="body"
          name="body"
          value={currentArticle.body}
          readOnly={true}
        />

        <label htmlFor="created_at">Created at</label>
        <input
          type="text"
          id="created_at"
          name="created_at"
          value={currentArticle.created_at}
          readOnly={true}
        />

        <label htmlFor="votes">Votes:</label>
        <input
          type="text"
          id="votes"
          name="votes"
          value={currentArticle.votes}
          readOnly={true}
        />

        <label htmlFor="article_img_url">Article Image:</label>

        <img
          src={currentArticle.article_img_url}
          alt={`Image from article ${currentArticle.title}`}
          readOnly={true}
        />

        <label htmlFor="comment_count">comment_count</label>
        <input
          type="text"
          id="comment_count"
          name="comment_count"
          value={currentArticle.comment_count}
          readOnly={true}
        />
      </form>
    </div>
  );
}
