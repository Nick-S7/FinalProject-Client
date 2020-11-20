import React from "react";

const CommentDetails = (props) => {
  const { author, content, createdAt } = props.comment;
  console.log(author);

  return (
    <div className="comment-container">
      <small className="comment-time">
        {new Date(createdAt).toLocaleDateString()}
      </small>
      <h5>{author}</h5>
      <p>{content}</p>
    </div>
  );
};

export default CommentDetails;
