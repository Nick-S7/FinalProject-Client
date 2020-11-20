import React from "react";

const CommentDetails = (props) => {
  const { author, content, createdAt } = props.comment;
  console.log(author);

  return (
    <div className="comment-container">

    <h5>{author} commented: </h5>

    <p>{content}</p>

      <small className="comment-time">
       <span>@</span> {new Date(createdAt).toLocaleDateString()}
      </small>

    </div>
  );
};

export default CommentDetails;
