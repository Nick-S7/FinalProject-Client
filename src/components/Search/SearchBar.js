import React, { Component } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

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
        this.setState({
          results: data.data._embedded.events,
        });
        console.log(this.state.results)
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
    } else if (query.length === 0){
        this.setState({
            query: "",
            results: []
        });
        return "";
    }
  };

  render() {
    return (
      <div className="search-page">
            
            <div className="search">
            <h3>-Search For Events-</h3>
                <form>
                    <input
                     className="search-field"
                     placeholder="Search"
                     onChange={this.handleInputChange}
                     />
                </form>
            </div>
           

            <div className="search-results">
            <SearchResults {...this.props} handleSelectedEvent={this.props.handleSelectedEvent} selectedEvent={this.props.selectedEvent} results={this.state.results} />
            </div>
      </div>
    );
  }
}

export default Search;
