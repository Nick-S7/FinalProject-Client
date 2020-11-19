import React from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const { username, email } = props.currentUser;
  return (
    <div className="profile-page">
    <div className="profile">
      <div className="profile-head">
      <img className="prof-pic" src="/profile-img-holder.png" alt="profile pic"/>
      <h3>{username}</h3>
      <p> This is your email: {email} </p>
      </div>


    <div className="profile-links">
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
    </div>



      </div>
    </div>
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
