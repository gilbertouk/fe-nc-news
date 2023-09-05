/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./DisplayArticleComments.css";
import { getArticleComments, postArticleComment } from "../../../utils/api";
import { CommentForm } from "../CommentForm";

export function DisplayArticleComments({
  article_id,
  total_comments,
  setCurrentArticle,
}) {
  const [articleComments, setArticleComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false);
  const [isErrorAddCommentMsgVisible, setIsErrorAddCommentMsgVisible] =
    useState(false);

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

  function addNewComment(newComment) {
    setArticleComments([newComment, ...articleComments]);
    setCurrentArticle((currentArticle) => {
      return {
        ...currentArticle,
        comment_count: +currentArticle.comment_count + 1,
      };
    });
    postArticleComment(article_id, {
      username: newComment.author,
      body: newComment.body,
    })
      .then(() => {
        setIsSuccessMsgVisible(true);
        setIsErrorAddCommentMsgVisible(false);
        return;
      })
      .catch(() => {
        setIsSuccessMsgVisible(false);
        setIsErrorAddCommentMsgVisible(true);
      });

    setTimeout(() => {
      setIsSuccessMsgVisible(false);
    }, 3000);
  }

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Whops, some error here... please reload the page!</p>;

  return (
    <div>
      <CommentForm
        addNewComment={addNewComment}
        isSuccessMsgVisible={isSuccessMsgVisible}
        isErrorAddCommentMsgVisible={isErrorAddCommentMsgVisible}
      />
      <p>Total comments: {total_comments}</p>
      <ul className="display--article--comments--list">
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
      </ul>
    </div>
  );
}