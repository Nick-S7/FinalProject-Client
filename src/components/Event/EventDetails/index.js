import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EVENT_SERVICE from "../../../services/EventService";

export default class EventDetails extends Component {
  state = {
    event: {},
  };

  loadEventDetails = () => {
    EVENT_SERVICE.getEventDetails(this.props.match.params.id)
      .then((responseFromServer) => {
        const { event } = responseFromServer.data;
        this.setState({ event });
      })
      .catch((err) => console.log(`error loading book details: ${err}`));
  };

  componentDidMount() {
    this.loadEventDetails();
  }

  deleteUserEvent = (eventId) => {
    if (eventId.length > 14) {
      EVENT_SERVICE.deleteEvent(eventId)
        .then(() => {
          this.props.onEventsChangeAfterDelete(eventId);
          this.props.history.push("/");
        })
        .catch((err) => console.log(`error deleting a user event: ${err}`));
    }
  };

  render() {
    const {
      _id,
      name,
      location,
      price,
      date,
      image,
      comments,
      creator,
    } = this.state.event;
    return (
      <section>
        <h3>{name}</h3>
        <img src={image} alt="venue" />
        <p>
          When: {date} at {location}
        </p>
        <p>Price: {price}</p>
        <h4>Event created by {creator}</h4>
        <br />
        <>
          <Link
            to={{
              pathname: `/api/events/${_id}/update`,
              event: this.state.event,
            }}
          >
            Edit
          </Link>
          <br />
          <button onClick={() => this.deleteEvent(_id)}>Delete Event</button>
        </>
      </section>
    );
  }
}
