import React from "react";

const CommentDetails = (props) => {
  const { author, content, createdAt } = props.comment;

  return (
    <div className="comment-container">
      <small className="comment-time">{createdAt}</small>
      <h5>{author}</h5>
      <p>{content}</p>
    </div>
  );
};

export default CommentDetails;
