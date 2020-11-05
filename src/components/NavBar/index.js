import React from 'react';

import { Link } from 'react-router-dom';

import AUTH_SERVICE from '../../services/AuthService';

const NavBar = props => {
  const logoutAndLiftUserState = () => {
    AUTH_SERVICE.logout()
      .then(() => props.onUserChange(null))
      .catch(err => console.log(err));
  };
<<<<<<< HEAD
=======

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
  return (
    <nav>
      <Link to='/'>
        <strong>BookClub</strong>
      </Link>

      {(props.currentUser && (
        <>
          <span>{props.currentUser.username}</span>
          <Link to='/profile'> Profile </Link>
          <Link to='/authors/create'> Create Author </Link>
<<<<<<< HEAD
=======
          <Link to='/books/create'> Create Book </Link>
>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
          <button onClick={logoutAndLiftUserState}> Logout </button>
        </>
      )) || (
        <>
          <Link to='/signup-page'>Signup</Link>
          <Link to='/login-page'>Login</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
