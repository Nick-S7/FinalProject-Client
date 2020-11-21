import React from "react";

const CommentDetails = (props) => {
  const { author, content, createdAt, _id } = props.comment;
  console.log(props);

  return (
    <div className="comment-container">
      <h5>{author} commented: </h5>

      <p>{content}</p>

      <small className="comment-time">
        <span>@</span> {new Date(createdAt).toLocaleDateString()}
      </small>
      {author === props.currentUser?.username && (
        <button onClick={() => props.handleDeleteComment(_id)}>Delete</button>
      )}
    </div>
  );
};

export default CommentDetails;
