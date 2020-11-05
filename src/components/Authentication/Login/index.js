import React from 'react';

import AUTH_SERVICE from '../../../services/AuthService';

<<<<<<< HEAD
export default class Signup extends React.Component {
=======
export default class Login extends React.Component {
>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
  state = {
    email: '',
    password: '',
    message: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

<<<<<<< HEAD
=======
  // ES6 destructuring - the same as above:
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
  handleFormSubmission = event => {
    event.preventDefault();

    const { email, password } = this.state;

    AUTH_SERVICE.login({ email, password })
      .then(responseFromServer => {
        const { user } = responseFromServer.data;

<<<<<<< HEAD
        this.props.onUserChange(user);
=======
        // Lift the user object to the App.js
        this.props.onUserChange(user);

        // Redirect user to home page after successful sign up
>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    return (
      <>
        <section>
<<<<<<< HEAD
=======
          <h2> Login </h2>

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
          <form onSubmit={this.handleFormSubmission}>
            <label>
              Email:
              <input
                name='email'
                type='email'
                placeholder='ana@ironhack.com'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
<<<<<<< HEAD
=======

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
            <label>
              Password:
              <input
                name='password'
                type='password'
                placeholder='**********'
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </label>
<<<<<<< HEAD
            <button> Login </button>
          </form>
=======

            <button> Login </button>
          </form>

          {/* if the message is not NULL then show the message */}
>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
          {this.state.message && <div> {this.state.message} </div>}
        </section>
      </>
    );
  }
}
