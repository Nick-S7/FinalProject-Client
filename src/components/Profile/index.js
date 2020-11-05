import React from 'react';

const Profile = props => {
<<<<<<< HEAD
  return (
    <>
      <h3>{props.currentUser.username}</h3>
      <p> This is your email: {props.currentUser.email} </p>
=======
  const { username, email } = props.currentUser;
  return (
    <>
      <h3>{username}</h3>
      <p> This is your email: {email} </p>
>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
    </>
  );
};

<<<<<<< HEAD
=======
// this is the same as above, just maybe a bit fancier:

// const Profile = ({ currentUser: { username, email } }) => {
//   return (
//     <>
//       <h3>{username}</h3>
//       <p> This is your email: {email} </p>
//     </>
//   );
// };

>>>>>>> 562bcb92e389ac3d49bfde19d9cfe558d22085ab
export default Profile;
