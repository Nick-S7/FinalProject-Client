import React from "react";
import axios from "axios";

import EVENT_SERVICE from "../../../services/EventService";

export default class CreateEvent extends React.Component {
  state = {
    name: "",
    location: "",
    price: 0,
    date: "",
    image: "",
    comments: null,
    creator: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // ES6 way - the same as above:
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };

  handleImageChange = (event) => {
    const { files } = event.target;
    console.log(event.target);

    this.setState({ image: files[0] });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();

    const uploadData = new FormData();
    uploadData.append("name", this.state.name);
    uploadData.append("location", this.state.location);
    uploadData.append("price", this.state.price);
    uploadData.append("date", this.state.date);
    uploadData.append("image", this.state.image);
    uploadData.append("creator", this.props.currentUser.username);

    axios
      .post("http://localhost:3001/api/events/create", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((responseFromServer) => {
        this.fileInput.value = "";
        const { event } = responseFromServer.data;
        console.log(responseFromServer.data);
        this.props.onEventsChange(event);
        this.props.history.push(`/api/events/${event._id}`);

        this.setState({
          name: "",
          location: "",
          price: 0,
          date: "",
          image: "",
        });
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    const {
      name,
      location,
      price,
      date,
      image,
      comments,
      creator,
    } = this.state;
    return (
      <div className="create-events-page">
        <div className="create-events-form">
          <h2> Create new Event </h2>

          <form
            className="create-event"
            onSubmit={(event) => this.handleFormSubmission(event)}
          >
            <label>
              Event Name:
              <input
                className="create-input"
                name="name"
                type="text"
                placeholder="Coachella 2021"
                value={name}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>

            <label>
              Location:
              <input
                className="create-input"
                name="location"
                type="text"
                placeholder="Empire Polo Club"
                value={location}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>

            <label>
              Price:
              <input
                className="create-input"
                name="price"
                type="number"
                placeholder="429"
                value={price}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>
            <label>
              Date:
              <input
                className="create-input"
                name="date"
                type="date"
                placeholder="04/13/2020"
                value={date}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>
            <label>
              Add an image:{" "}
              <input
                className="create-input"
                id="imageInput"
                type="file"
                name="image"
                onChange={(event) => this.handleImageChange(event)}
                ref={(ref) => (this.fileInput = ref)}
              />
            </label>

            {/* <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="text" name="name" />
    <input type="file" name="photo" />
    <input type="submit" value="Save" />
  </form> */}

            <button className="create-event-btn"> Create Event </button>
          </form>

          {/* {message && <div>{message}</div>} */}
        </div>
      </div>
    );
  }
}
