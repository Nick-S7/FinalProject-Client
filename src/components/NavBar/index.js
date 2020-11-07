import React from "react";

import { Link } from "react-router-dom";

import AUTH_SERVICE from "../../services/AuthService";

import NavSearch from '../Search/NavSearch'

const NavBar = props => {
  const logoutAndLiftUserState = () => {
    AUTH_SERVICE.logout()
      .then(() => props.onUserChange(null))
      .catch((err) => console.log(err));
  };
  return (
    <nav>

    <NavSearch/>

    <div className="logo">
      <Link to="/">
        <strong>BookClub</strong>
      </Link>
    </div>
    <div>
      {(props.currentUser && (
        <div className="li-nav">
          <span></span>
          <Link to='/profile'>{props.currentUser.username} </Link> |
          <Link to='/authors/create'> Create Author </Link> |
          <Link to='/books/create'> Create Book </Link> |
          
          <button className="lo-nav-btn" onClick={logoutAndLiftUserState}> Logout </button>
        </div>
      )) || (
        <div className="lo-nav">
         
          <Link to='/signup-page'>Signup</Link> |
          <Link to='/login-page'>Login</Link>
        </div>
      )}
      </div>
    </nav>
  );
};

export default NavBar;
