import React from "react";
import { Link } from "react-router-dom"
import SearchBar from "../Search/SearchBar"

const Home = (props) => {
  return (
    <div className="home">
      <div className="home-head">
        <h2> Atlas </h2>
        <p> An Innovative Search Engine for Events and Attractions </p>
      </div>

      
      <SearchBar {...props} handleSelectedEvent={props.handleSelectedEvent} selectedEvent={props.selectedEvent} />

      
      <footer style={{ clear: "both" }}>
          <div className="footer">

          <Link to='/concerts'>
            <div className="foot-section">
            <img  src="/second-crowd.png" alt="footer-pic"/>
            <div className="foot-text">
            <h3> Artists, Concerts, and More...</h3>
            <p>
            Find all your favorite artists and concerts in one place! Make your own account to comment on events, and see what your friends had to say!
            </p>
            </div>
            </div>
            </Link>

            <Link to='/profile'>
            <div className="foot-section-2">
            <img src="/profile-silo.png"  alt="footer-pic"/>
            <div className="foot-text">
            <h3>Create Your Own Profile</h3>
            <p>
              Easily sign-up and have access to creating your own events, commenting on other events, and customizing your profile!
            </p>
            </div>
            </div>
            </Link>
            
            <Link to ='/sports'>
            <div className="foot-section">
            <img className="special-pic" src="/sports-silo.png" alt="footer-pic"/>
            <div className="foot-text">
            <h3>Sporting Events</h3>
            <p>
              Search for times, dates, locations, and more details on any upcoming sporting event!
            </p>
            </div>
            </div>
            </Link>

          </div>
          </footer>
      
    </div>
    
  );
};

export default Home;

// Maybe it makes more sense to have this component as functional.
// Find below how we did it on the class:

// export default class Home extends React.Component {
//   render() {
//     console.log('do i have authors: ', this.props);
//     return (
//       <>
//         <h2> This is a home page of BookClub! 📚</h2>
//         <p> Welcome to Server-Client demo app! This is your favorite app forever! 🚀 </p>

//         <div style={{ width: '50%', float: 'left' }}>
//           <h3>Books</h3>
//           <ListBooks books={this.props.books} />
//         </div>

//         <div style={{ width: '50%', float: 'right' }}>
//           <h3>Authors</h3>
//           <ListAuthors authors={this.props.authors} />
//         </div>
//       </>
//     );
//   }
// }
