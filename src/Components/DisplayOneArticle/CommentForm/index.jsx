/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import "./CommentForm.css";
import { User } from "../../../Context/User";

export function CommentForm({
  addNewComment,
  isErrorAddCommentMsgVisible,
  isSuccessMsgVisible,
}) {
  const { username } = useContext(User);
  const [newComment, setNewComment] = useState("");

  const defaultComment = {
    username,
    body: "",
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newComment.length === 0) return;

    defaultComment.body = newComment;
    addNewComment(defaultComment);
    setNewComment("");
  };

  return (
    <form className="comment--form" onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="comment">New comment:</label>
        <textarea
          required
          id="comment"
          value={newComment}
          onChange={(event) => {
            return setNewComment(event.target.value);
          }}
        />
      </div>
      {isSuccessMsgVisible && (
        <p id="success-msg" style={{ color: "green" }}>
          Comment added successfully
        </p>
      )}
      {isErrorAddCommentMsgVisible && (
        <p id="error-msg" style={{ color: "red" }}>
          Something went wrong with your comment, try again
        </p>
      )}
      <div className="comment--form--button">
        <button type="submit">Add comment</button>
      </div>
    </form>
  );
}
