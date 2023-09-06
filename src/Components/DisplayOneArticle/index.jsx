import { useState, useEffect } from "react";
import { getArticleById, patchArticleById } from "../../utils/api";
import "./DisplayOneArticle.css";
import { useParams } from "react-router-dom";
import { DisplayArticleComments } from "./DisplayArticleComments";
import moment from "moment";

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
  const [isVoteError, setIsVoteError] = useState(false);
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
    setIsVoteError(false);

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
        setIsVoteError(true);
      });
  }

  function handleDecrementVote() {
    setIsVoteError(false);

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
        setIsVoteError(true);
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
        Created at: {moment(currentArticle.created_at).format("MMMM Do YYYY")};
      </p>
      <div className="display--article--votes">
        <p>Votes: {currentArticle.votes}</p>
        <p
          className={`display--article--votes--p" ${
            isVoteError
              ? "display--article--votes--error--active"
              : "display--article--votes--error--inactive"
          }`}
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
