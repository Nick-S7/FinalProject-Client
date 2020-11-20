import React from "react";

import AUTH_SERVICE from "../../../services/AuthService";

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    message: null,
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // ES6 destructuring - the same as above:
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };

  handleFormSubmission = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    AUTH_SERVICE.login({ email, password })
      .then((responseFromServer) => {
        const { user } = responseFromServer.data;

        // Lift the user object to the App.js
        this.props.onUserChange(user);

        // Redirect user to home page after successful sign up
        this.props.history.push("/");
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    return (
      <div className="login-page">
      <div className="login-form">
          <h2> Login </h2>

          

          <form onSubmit={this.handleFormSubmission}>
          <div>
            <label className="email-label">
              Email:
              </label>
              <input
              className="input-field"
                name="email"
                type="email"
                placeholder="ana@ironhack.com"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            
            </div>
            <div>
            <label>
              Password:
              <input
              className="input-field"
                name="password"
                type="password"
                placeholder="**********"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
            </div>
            <button> Login </button>
          </form>
          

          {/* if the message is not NULL then show the message */}
          {this.state.message && <div> {this.state.message} </div>}
          </div>
      </div>
    );
  }
}
