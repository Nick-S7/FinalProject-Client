import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EVENT_SERVICE from "../../../services/EventService";
import COMMENT_SERVICE from "../../../services/CommentService";
import ListComments from "../../Comment/ListComments";
import CommentForm from "../../Comment/CommentForm";

export default class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      comments: [],
    };

    this.addComment = this.addComment.bind(this);
  }

  addComment(comment) {
    this.setState({
      comments: [...this.state.comments, comment],
    });
  }

  handleDeleteComment = (commentId) => {
    COMMENT_SERVICE.deleteComment(this.state.event._id, commentId).then(() => {
      // const comments = this.state.event.comments.filter((c) => c !== commentId);
      // const event = { ...this.state.event, comments };
      this.setState({
        // event,
        comments: this.state.comments.filter((c) => c._id !== commentId),
      });
    });
  };

  loadEventDetails = () => {
    const eventId = this.props.match.params.id;
    const baseUrl = `https://app.ticketmaster.com/discovery/v2/events/`;

    //check the id length of the event which will determine whether event should be loaded via API or DB
    if (eventId.length < 20) {
      //load event via axios call if id length is less than 20 digits (length of MongoDB id)
      axios
        .get(`${baseUrl}/${eventId}?apikey=CRaZgOHhS0iRjYSFURNt0YrDZs6z0nVR`)
        .then((responseFromApi) => {
          // console.log(this.props);
          //set the state to the responseFromApi
          this.setState({ event: responseFromApi.data });
          // console.log(this.state);
        })
        .catch((err) => console.log(`error loading event from API: ${err}`));
    } else {
      //otherwise load event via DB using event_service
      EVENT_SERVICE.getEventDetails(eventId)
        .then((responseFromServer) => {
          // console.log(responseFromServer);
          const { event } = responseFromServer.data;
          this.setState({ event: event });
        })
        .catch((err) => console.log(`error loading event from DB: ${err}`));
    }
  };

  //get the Comments for the loaded event
  getEventComments = () => {
    const eId = this.props.match.params.id;
    COMMENT_SERVICE.getComments(eId)
      .then((responseFromServer) => {
        const { comments } = responseFromServer.data;
        this.setState({ comments });
      })
      .catch((err) =>
        console.log(`error getting comments for this event: ${err}`)
      );
  };

  componentDidMount() {
    this.loadEventDetails();
    this.getEventComments();
  }

  deleteUserEvent = (eventId) => {
    if (eventId.length > 16) {
      EVENT_SERVICE.deleteEvent(eventId)
        .then(() => {
          this.props.onEventsChangeAfterDelete(eventId);
          this.props.history.push("/");
        })
        .catch((err) => console.log(`error deleting a user event: ${err}`));
    } else
      console.log(
        "events from the API cannot be deleted. Make this easier for the user to see outside the console."
      );
  };

  // formatDate = (date) => {
  //   return date.split(" ").splice(1, 3).join(" ");
  // };

  render() {
    // console.log(this.state.event, "1");
    const { event } = this.state;
    // console.log(this.state.comments);
    // console.log("checking if state was set to event: ", event);
    // console.log("checking for nested objects in state: ", event.priceRanges);
    // console.log(`any comments? ${mappedComments?.[0]}`);

    return (
      //need to debug why comments are not rendered even though the state does display the comments.
      <div className="details-page">
        <div className="details-container">
          <div className="top-half-details">
            <div className="details-head">
              <img
                className="details-img"
                src={
                  event?.image ||
                  event?._embedded?.attractions?.[0]?.images?.[1]?.url
                }
                alt="venue"
              />

              <h3>{event?.name}</h3>
            </div>

            <div className="details-details">
              <p>When: {event?.date || event.dates?.start?.localDate}</p>
              <p>
                Where: {event?.location || event?._embedded?.venues?.[0]?.name}
              </p>

              <p>Price: ${event?.price || event?.priceRanges?.[0]?.min}</p>

              <a href={event?.url}>Purchase Tickets</a>

              <h3>Information about this event: </h3>
              <p>
                {event?.info ||
                  event?.pleaseNote ||
                  "This is a custom event created by the community!"}
              </p>

              <h4>Event created by {event?.creator || "Ticketmaster"}</h4>

              <br />
              <>
                <Link
                  to={{
                    pathname: `/api/events/${event?.id}/update`,
                    event: this.state.event,
                  }}
                >
                  Edit
                </Link>
                <br />

                <button
                  className="delete-event-btn"
                  onClick={() => this.deleteUserEvent(event.id)}
                >
                  Delete Event
                </button>
              </>
            </div>
          </div>
          <br />
          <CommentForm
            {...this.props}
            onCommentsChange={this.props.onCommentsChange}
            addComment={this.addComment}
          />
          <h2 className="comment-head">Comments</h2>
          <ListComments
            comments={this.state.comments}
            {...this.props}
            handleDeleteComment={this.handleDeleteComment}
          />
        </div>
      </div>
    );
  }
}
