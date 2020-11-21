import React from "react";
import COMMENT_SERVICE from "../../../services/CommentService";
// import ListComments from "../ListComments";

export default class CommentForm extends React.Component {
  state = {
    error: "",
    comment: {
      author: "",
      content: "",
    },
  };

  //handle input change and update the state
  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value,
      },
    });
  };

  isFormValid() {
    return (
      this.state.comment.author !== "" && this.state.comment.content !== ""
    );
  }

  //handle comment submission
  handleFormSubmission = (e) => {
    e.preventDefault();
    if (this.isFormValid()) {
      this.setState({ error: "Please enter a comment before submitting." });
      return;
    }
    const { content } = this.state.comment;
    const { event } = this.props;
    COMMENT_SERVICE.createComment({ content, event })
      .then((responseFromServer) => {
        const { comment } = this.state;
        this.props.updateComments(comment);
        this.props.history.push(`/api/events/${this.props.event.id}`);
        //clear the comment form
        this.setState({
          comment: { ...comment, content: "" },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  //   in case you don't care for one more call tp your server, you can make it in componentDidMount as follows:
  //   componentDidMount = () => {
  //     AUTHOR_SERVICE.getAuthors()
  //       .then(responseFromServer => {
  //         const { authors } = responseFromServer.data;
  //         this.setState({ authors });
  //       })
  //       .catch(err => console.log(err));
  //   };

  render() {
    // console.log("comment: ", this.state.comment.content);
    const { content, author } = this.state.comment;

    return (
      <div className="center-add-com">
        <section className="add-comment-bkg">
          <h2 className="comment-head"> Add a Comment </h2>

          <form className="add-comment" onSubmit={this.handleFormSubmission}>
            <label>
              <input
                className="comment-input"
                name="content"
                type="text"
                rows="5"
                placeholder="Begin typing your comment here..."
                value={content}
                onChange={this.handleInputChange}
              />
            </label>

            {this.renderError()}

            <button className="submit-comment-btn"> Submit Comment </button>
            {/* <button disabled={this.state.loading}> Submit Comment </button> */}
          </form>

          {/* {message && <div>{message}</div>} */}
        </section>
      </div>
    );
  }
}
