/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./DisplayArticleComments.css";
import { getArticleComments } from "../../../utils/api";

export function DisplayArticleComments({ article_id }) {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getArticleComments(article_id)
      .then(({ comments }) => {
        setIsLoading(false);
        setIsError(false);
        setArticleComments(comments);
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
      {articleComments.map((comment) => {
        return (
          <li key={comment.comment_id}>
            <p>Author: {comment.author}</p>
            <p>
              Created at:{" "}
              {comment.created_at
                ? new Date(comment.created_at)
                    .toJSON()
                    .slice(0, 10)
                    .split("-")
                    .reverse()
                    .join("/")
                : ""}
            </p>
            <p>{comment.body}</p>
            {comment.votes >= 0 && <p>👍{comment.votes}</p>}
            {comment.votes < 0 && <p>👎{comment.votes}</p>}
            <hr />
          </li>
        );
      })}
    </div>
  );
}
