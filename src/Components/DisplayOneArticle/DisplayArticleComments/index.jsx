/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./DisplayArticleComments.css";
import {
  deleteArticleComment,
  getArticleComments,
  postArticleComment,
} from "../../../utils/api";
import { CommentForm } from "../CommentForm";
import moment from "moment";

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
  const [deletedComment, setDeletedComment] = useState(false);
  const [isErrorDeleteCommentMsgVisible, setIsErrorDeleteCommentMsgVisible] =
    useState(false);

  useEffect(() => {
    setIsErrorDeleteCommentMsgVisible(false);
    setIsLoading(true);
    setDeletedComment(false);
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
  }, [article_id, deletedComment]);

  function addNewComment(newComment) {
    postArticleComment(article_id, newComment)
      .then(({ comment }) => {
        setArticleComments([{ ...comment }, ...articleComments]);
        setCurrentArticle((currentArticle) => {
          return {
            ...currentArticle,
            comment_count: +currentArticle.comment_count + 1,
          };
        });
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

  function handleSelectedComment(comment) {
    deleteArticleComment(comment.comment_id)
      .then(() => {
        setDeletedComment(true);
        setCurrentArticle((currentArticle) => {
          return {
            ...currentArticle,
            comment_count: +currentArticle.comment_count - 1,
          };
        });
      })
      .catch(() => {
        setIsErrorDeleteCommentMsgVisible(true);
        console.log("test here");
      });
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
                Created at: {moment(comment.created_at).format("MMMM Do YYYY")}
              </p>
              <p>{comment.body}</p>
              {comment.votes >= 0 && <p>👍{comment.votes}</p>}
              {comment.votes < 0 && <p>👎{comment.votes}</p>}
              {isErrorDeleteCommentMsgVisible && (
                <p id="error-delete-msg" style={{ color: "red" }}>
                  Something went wrong, try again
                </p>
              )}
              <button
                onClick={() => {
                  handleSelectedComment(comment);
                }}
                type="submit"
              >
                delete comment
              </button>
              <hr />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
