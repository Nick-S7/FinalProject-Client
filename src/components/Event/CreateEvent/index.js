import React from "react";
import axios from "axios";

import EVENT_SERVICE from "../../../services/EventService";

export default class CreateEvent extends React.Component {
  state = {
    name: "",
    location: "",
    price: "",
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

  // handleImageChange = (event) => {
  //   const { file } = event.target;

  //   uploadData.append("image", file);
  // };

  handleFormSubmission = (event) => {
    event.preventDefault();

    const uploadData = new FormData();

    uploadData.append("name", this.state.name);
    uploadData.append("location", this.state.location);
    uploadData.append("price", this.state.price);
    uploadData.append("date", this.state.date);
    uploadData.append("image", this.state.image);
    uploadData.append("comments", this.state.comments);
    uploadData.append("creator", this.state.creator);

    EVENT_SERVICE.createEvent(
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
        const { event } = responseFromServer.data;

        this.props.onEventsChange(event);
        this.props.history.push("/");
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
      <>
        <section>
          <h2> Create new Event </h2>

          <form onSubmit={this.handleFormSubmission}>
            <label>
              Event Name
              <input
                name="name"
                type="text"
                placeholder="Coachella 2021"
                value={name}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Location
              <input
                name="location"
                type="text"
                placeholder="Empire Polo Club"
                value={location}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Price
              <input
                name="price"
                type="number"
                placeholder="429"
                value={price}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              date
              <input
                name="date"
                type="date"
                placeholder="04/13/2020"
                value={date}
                onChange={this.handleInputChange}
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
        </section>
      </>
    );
  }
}
