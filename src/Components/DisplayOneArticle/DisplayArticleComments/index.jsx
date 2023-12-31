/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import "./DisplayArticleComments.css";
import {
  deleteArticleComment,
  getArticleComments,
  postArticleComment,
} from "../../../utils/api";
import { CommentForm } from "../CommentForm";
import moment from "moment";
import { PaginationButton } from "../../DisplayOfArticles/ArticleList/PaginationButton";
import { useSearchParams } from "react-router-dom";
import { User } from "../../../Context/User";

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
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDeletedSuccessMsgVisible, setIsDeletedSuccessMsgVisible] =
    useState(false);
  const { username } = useContext(User);
  const limit = 10;

  useEffect(() => {
    setIsErrorDeleteCommentMsgVisible(false);
    setIsLoading(true);
    setDeletedComment(false);
    getArticleComments(article_id, searchParams.toString())
      .then(({ comments }) => {
        setIsLoading(false);
        setIsError(false);
        setArticleComments(comments);
        setTotalPages(Math.ceil(total_comments / limit));
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id, deletedComment, searchParams, total_comments]);

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
    setIsLoading(true);
    deleteArticleComment(comment.comment_id)
      .then(() => {
        setIsLoading(false);
        setIsDeletedSuccessMsgVisible(true);
        setDeletedComment(true);
        setCurrentArticle((currentArticle) => {
          return {
            ...currentArticle,
            comment_count: +currentArticle.comment_count - 1,
          };
        });
      })
      .catch(() => {
        setIsLoading(false);
        setIsErrorDeleteCommentMsgVisible(true);
      });

    setTimeout(() => {
      setIsDeletedSuccessMsgVisible(false);
    }, 4000);
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
      {isDeletedSuccessMsgVisible && (
        <p id="success-msg" style={{ color: "green" }}>
          Comment deleted successfully
        </p>
      )}
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
              {comment.author === username && (
                <button
                  onClick={() => {
                    handleSelectedComment(comment);
                  }}
                  type="submit"
                >
                  delete comment
                </button>
              )}
              <hr />
            </li>
          );
        })}
      </ul>
      <PaginationButton
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </div>
  );
}
