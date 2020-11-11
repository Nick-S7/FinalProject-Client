import React from "react";
import SearchBar from "../Search/SearchBar"

const Home = (props) => {
  return (
    <div className="home">
    <div className="home-head">      
    <h2> Atlas </h2>
      <p>
        {" "}
        An Innovative Search Engine for Events and Attractions{" "}
      </p>
    </div>


      
      <SearchBar/>
      
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
