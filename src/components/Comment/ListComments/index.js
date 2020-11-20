import React from "react";
import CommentDetails from "../CommentDetails";

const ListComments = (props) => {
  return (
    <section className="commentList">
      {props.comments?.length === 0 && !props.loading ? (
        <div className="no-comment-alert">
          Be the first to comment on this event!
        </div>
      ) : null}
      <ul>
        <ul>
          {props.comments?.map((c, index) => (
            <CommentDetails key={index} comment={c} />
          ))}
        </ul>
      </ul>
    </section>
  );
};

export default ListComments;
