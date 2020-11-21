import React, { Component } from "react";
import AUTH_SERVICE from "../../services/AuthService";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // _id: "",
      // username: "",
      // email: "",
      _id: props.currentUser._id,
      username: props.currentUser.username,
      email: props.currentUser.email,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    // console.log("state before submitting changes: ", this.state);
    const { _id, username, email } = this.state;
    console.log("state after submitting changes: ", this.state);

    AUTH_SERVICE.updateProfile({ username, email })
      .then((responseFromServer) => {
        console.log("response from server: ", responseFromServer);
        const { user } = responseFromServer.data;
        // console.log(user);
        this.props.handleChangeUser({ username, email });
        this.props.history.push("/profile");
      })
      .catch((err) => console.log("error updating user profile: ", err));
  };

  render() {
    const { username, email } = this.state;
    console.log(this.state);

    return (
      <section>
        <h2>Edit Profile</h2>
        <form onSubmit={this.handleFormSubmission}>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={username}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="text"
              value={email}
              onChange={this.handleInputChange}
            />
          </label>
          <button>Save Changes</button>
        </form>
      </section>
    );
  }
}
