import { useState, useEffect } from "react";
import { getArticleById, patchArticleById } from "../../utils/api";
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
    votes: 0,
    article_img_url: "",
    comment_count: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [counter, setVotes] = useState({ votes: 0 });
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

  function handleIncrementVote() {
    document.getElementById(
      "display--article--votes--error--vote"
    ).style.display = "none";

    setVotes((currentVotes) => {
      counter.votes = currentArticle.votes + 1;
      return { ...currentVotes };
    });

    setCurrentArticle((currentArticle) => ({
      ...currentArticle,
      votes: counter.votes,
    }));

    patchArticleById(article_id, { inc_votes: 1 })
      .then(() => {
        return;
      })
      .catch(() => {
        document.getElementById(
          "display--article--votes--error--vote"
        ).style.display = "inline";
      });
  }

  function handleDecrementVote() {
    document.getElementById(
      "display--article--votes--error--vote"
    ).style.display = "none";

    setVotes((currentVotes) => {
      counter.votes = currentArticle.votes - 1;
      return { ...currentVotes };
    });

    setCurrentArticle((currentArticle) => ({
      ...currentArticle,
      votes: counter.votes,
    }));

    patchArticleById(article_id, { inc_votes: -1 })
      .then(() => {
        return;
      })
      .catch(() => {
        document.getElementById(
          "display--article--votes--error--vote"
        ).style.display = "inline";
      });
  }

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
      <div className="display--article--votes">
        <p>Votes: {currentArticle.votes}</p>
        <p
          id="display--article--votes--error--vote"
          style={{ display: "none", color: "red" }}
        >
          Something went wrong with your vote, try again
        </p>
        <button onClick={handleIncrementVote}>👍</button>{" "}
        <button onClick={handleDecrementVote}>👎</button>
      </div>

      <div className="display--article--comments">
        <DisplayArticleComments
          article_id={article_id}
          total_comments={currentArticle.comment_count}
          setCurrentArticle={setCurrentArticle}
        />
      </div>
    </div>
  );
}
