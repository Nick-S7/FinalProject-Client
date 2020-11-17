import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EVENT_SERVICE from "../../../services/EventService";
import COMMENT_SERVICE from "../../../services/CommentService";

export default class EventDetails extends Component {
  state = {
    event: {},
    comments: [],
  };

  loadEventDetails = () => {
    const eventId = this.props.match.params.id;
    const baseUrl = `https://app.ticketmaster.com/discovery/v2/events/`;
    console.log(eventId);

    //check the id length of the event which will determine whether event should be loaded via API or DB
    if (eventId.length < 20) {
      //load event via axios call if id length is less than 20 digits (length of MongoDB id)
      axios
        .get(`${baseUrl}/${eventId}?apikey=CRaZgOHhS0iRjYSFURNt0YrDZs6z0nVR`)
        .then((responseFromApi) => {
          console.log("response from axios:", responseFromApi.data);
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
        const { allComments } = responseFromServer.data;
        this.setState({ comments: allComments });
      })
      .catch((err) =>
        console.log(`error getting comments for this event: ${err}`)
      );
  };

  componentDidMount() {
    this.loadEventDetails();
    // this.getEventComments();
  }

  deleteUserEvent = (eventId) => {
    if (eventId.length > 16) {
      EVENT_SERVICE.deleteEvent(eventId)
        .then(() => {
          this.props.onEventsChangeAfterDelete(eventId);
          this.props.history.push("/");
        })
        .catch((err) => console.log(`error deleting a user event: ${err}`));
    }
  };

  render() {
    // console.log(this.state.event, "1");
    const { event } = this.state;
    const mappedComments = this.state.comments.map((c) => {
      <div className="single-comment" key={c._id}>
        <h3>{c.author}</h3>
        <br />
        <p>{c.content}</p>
      </div>;
    });
    console.log("checking if state was set to event: ", event);
    console.log("checking for nested objects in state: ", event.priceRanges);
    console.log(`any comments? ${mappedComments}`);

    return (
      <section>
        <h3>{event?.name}</h3>
        <img
          src={event?.image || event?._embedded?.attractions[0]?.images[1]?.url}
          width="850"
          height="450"
          alt="venue"
        />
        <p>
          When: {event?.date || event?.dates?.start?.localDate} at{" "}
          {event?.location || event?._embedded?.venues[0]?.name}
        </p>
        <p>Price: ${event?.price || event?.priceRanges?.min}</p>
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
          <button onClick={() => this.deleteUserEvent(event.id)}>
            Delete Event
          </button>
        </>
        <br />
        <h2>Comments</h2>
        <div>{mappedComments}</div>
      </section>
    );
  }
}
