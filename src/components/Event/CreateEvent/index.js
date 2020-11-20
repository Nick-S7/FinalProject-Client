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
    const formatDate = (date) => {
      return date.split(" ").splice(1, 3).join(" ");
    };
    console.log(this.state.currentUser);
    uploadData.append("name", this.state.name);
    console.log(this.state.name);
    uploadData.append("location", this.state.location);
    console.log(this.state.location);
    uploadData.append("price", this.state.price);
    console.log(this.state.price);
    uploadData.append("date", formatDate(this.state.date));
    console.log(this.state.date);
    uploadData.append("image", this.state.image);
    // uploadData.append("comments", this.state.comments);
    uploadData.append("creator", this.props.currentUser.username);

    axios
      .post(
        "http://localhost:3001/api/events/create",
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
        // {
        //   name,
        //   location,
        //   price,
        //   date,
        //   image,
        //   comments,
        //   creator,
        // }
      )
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
      <div className="signup-page">
        <div className="signup-form">
          <h2> Create new Event </h2>

          <form onSubmit={(event) => this.handleFormSubmission(event)}>
            <label>
              Event Name
              <input
                name="name"
                type="text"
                placeholder="Coachella 2021"
                value={name}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>

            <label>
              Location
              <input
                name="location"
                type="text"
                placeholder="Empire Polo Club"
                value={location}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>

            <label>
              Price
              <input
                name="price"
                type="number"
                placeholder="429"
                value={price}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>
            <label>
              date
              <input
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

            <button> Create Event </button>
          </form>

          {/* {message && <div>{message}</div>} */}
        </div>
      </div>
    );
  }
}
