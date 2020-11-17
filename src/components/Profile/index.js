import React from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const { username, email } = props.currentUser;
  return (
    <>
      <h3>{username}</h3>
      <p> This is your email: {email} </p>
      <Link
        to={{
          pathname: "/api/edit-profile",
          currentUser: props.currentUser,
        }}
      >
        Edit Profile
      </Link>
      <Link
        to={{
          pathname: "/api/events/create",
          currentUser: props.currentUser,
        }}
      >
        Create an Event
      </Link>
    </>
  );
};

// this is the same as above, just maybe a bit fancier:

// const Profile = ({ currentUser: { username, email } }) => {
//   return (
//     <>
//       <h3>{username}</h3>
//       <p> This is your email: {email} </p>
//     </>
//   );
// };

export default Profile;
