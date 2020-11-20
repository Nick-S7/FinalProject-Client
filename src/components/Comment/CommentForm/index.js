import React from "react";
import COMMENT_SERVICE from "../../../services/CommentService";
// import ListComments from "../ListComments";

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // loading: false,
      error: "",

      comment: {
        author: "",
        content: "",
      },
    };

    //bind the context to these methods
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
  }

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

  //handle comment submission
  handleFormSubmission = (event) => {
    event.preventDefault();

    if (!this.isFormValid()) {
      this.setState({ error: "Please enter a comment before submitting." });
      return;
    }

    this.setState({
      error: "",
      // loading: true
    });

    let { author, content } = this.state;

    //populate comment on Db.

    COMMENT_SERVICE.createComment({ author, content })
      .then((responseFromServer) => {
        const { comment } = responseFromServer.data;
        this.props.onCommentsChange(comment);
        this.props.history.push("/");

        //clear the comment form
        this.setState({
          // loading: false,
          comment: { ...comment, content: "" },
        });
      })
      .catch((err) => {
        this.setState({
          // loading: false,
          error: err.response.data,
        });
      });

    // BOOK_SERVICE.createBook({ content, author })
    //   .then((responseFromServer) => {
    //     const { book } = responseFromServer.data;

    //     this.props.onBooksChange(book);
    //     this.props.history.push("/");
    //   })
    //   .catch((err) => {
    //     if (err.response && err.response.data) {
    //       return this.setState({ message: err.response.data.message });
    //     }
    //   });
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
    console.log("comment: ", this.state.comment.content);
    const { content, author } = this.state.comment;

    return (
      <section>
        <h2> Add a Comment </h2>

        <form onSubmit={this.handleFormSubmission}>
          <label>
            Title
            <input
              name="content"
              type="text"
              rows="5"
              placeholder="Begin typing your comment here..."
              value={content}
              onChange={this.handleInputChange}
            />
          </label>

          {this.renderError()}

          <button> Submit Comment </button>
          {/* <button disabled={this.state.loading}> Submit Comment </button> */}
        </form>

        {/* {message && <div>{message}</div>} */}
      </section>
    );
  }
}
