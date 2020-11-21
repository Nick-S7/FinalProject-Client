import React from "react";
import CommentDetails from "../CommentDetails";

const ListComments = (props) => {
  return (
    <section className="comment-list">
      {props.comments?.length === 0 && !props.loading ? (
        <div className="no-comment-alert">
          Be the first to comment on this event!
        </div>
      ) : null}
      <ul className="comment-list">
        <ul className="comment-list">
          {props.comments?.map((c, index) => (
            <CommentDetails key={index} comment={c} {...props} />
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default ListComments;
