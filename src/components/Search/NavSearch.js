import React, { Component } from "react";
import axios from "axios";
import NavResults from "./NavResults";

class Search extends Component {
  state = {
    query: "",
    results: [],
  };
  

  getInfo = () => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.state.query}&countryCode=US&apikey=CRaZgOHhS0iRjYSFURNt0YrDZs6z0nVR`
      )
      .then(( data ) => {
          console.log(data.data)
        this.setState({
          results: data.data._embedded.events,
        });
      });
  };

  handleInputChange = (e) => {
    const query = e.target.value;
    this.setState({
      query,
    });
    if (query && query.length > 1) {
      if (query.length % 2 === 0) {
        this.getInfo();
      }
    } else if (!query) {
    }
  };

  render() {
    return (
      <div className="nav-search">
            <div className="nav-input">
                <form>
                    <input
                     className="nav-search-field"
                     placeholder="Search"
                     onChange={this.handleInputChange}
                     />
                </form>
            </div>

            <>
            <NavResults {...this.props} results={this.state.results} />
            </>
      </div>
    );
  }
}

export default Search;
