import React from 'react';

import AUTHOR_SERVICE from '../../../services/AuthorService';

export default class CreateAuthor extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    nationality: '',
    birthday: '',
    pictureUrl: '',
    message: null
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

<<<<<<< HEAD
=======
  // ES6 way - the same as above:
  // handleInputChange = ({ target: { name, value } }) => {
  //   this.setState({
  //     [name]: value
  //   });
  // };

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
  handleFormSubmission = event => {
    event.preventDefault();

    const { firstName, lastName, nationality, birthday, pictureUrl } = this.state;

    AUTHOR_SERVICE.createAuthor({ firstName, lastName, nationality, birthday, pictureUrl })
      .then(responseFromServer => {
<<<<<<< HEAD
        // console.log('res from server in author:', responseFromServer);
=======
>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
        const { author } = responseFromServer.data;

        this.props.onAuthorsChange(author);
        this.props.history.push('/');
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return this.setState({ message: err.response.data.message });
        }
      });
  };

  render() {
    const { firstName, lastName, nationality, birthday, pictureUrl, message } = this.state;
    return (
      <>
        <section>
<<<<<<< HEAD
=======
          <h2> Create new Author </h2>

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
          <form onSubmit={this.handleFormSubmission}>
            <label>
              First Name
              <input
                name='firstName'
                type='text'
                placeholder='Oscar'
                value={firstName}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Last Name
              <input
                name='lastName'
                type='text'
                placeholder='Wilde'
                value={lastName}
                onChange={this.handleInputChange}
              />
            </label>

            <label>
              Nationality
              <input
                name='nationality'
                type='text'
                placeholder='English'
                value={nationality}
                onChange={this.handleInputChange}
              />
            </label>
<<<<<<< HEAD
=======

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
            <label>
              Birthday
              <input
                name='birthday'
                type='date'
                placeholder='10/28/1900'
                value={birthday}
                onChange={this.handleInputChange}
              />
            </label>
<<<<<<< HEAD
=======

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
            <label>
              Picture Url
              <input
                name='pictureUrl'
                type='text'
                placeholder='www.cool-image.com'
                value={pictureUrl}
                onChange={this.handleInputChange}
              />
            </label>
<<<<<<< HEAD
            <button> Create Author </button>
          </form>
=======

            <button> Create Author </button>
          </form>

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
          {message && <div>{message}</div>}
        </section>
      </>
    );
  }
}
