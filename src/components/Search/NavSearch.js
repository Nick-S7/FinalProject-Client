import React, { Component } from "react";
import axios from "axios";
import NavResults from "./NavResults";

class Search extends Component {
  state = {
    query: "",
    results: [],
    open: false,
  };

  getInfo = () => {
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.state.query}&countryCode=US&apikey=CRaZgOHhS0iRjYSFURNt0YrDZs6z0nVR`
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          results: response.data._embedded?.events || [],
        });
      });
  };

  // componentDidUpdate(prevProps) {
  //   if(this.props.)
  // }

  handleInputChange = (e) => {
    const query = e.target.value;
    const results = this.state.results;
    this.setState({
      query,
    });
    if (query && query.length > 1) {
      if (query.length % 2 === 0) {
        this.getInfo();
      }
    } else if (!results) {
      this.setState({ results: [] });
    } else if (!query) {
    }
  };

  toggleDropdown() {
    this.setState({ open: !this.state.open });
  }

  clearSearch = () => {
    this.setState({ query: "", open: false, results: [] });
  };

  render() {
    console.log(this.props);
    return (
      <div className="nav-search">
        <div className="nav-input">
          <div
            style={{ border: "1px solid #CCC" }}
            // onBlur={() => this.toggleDropdown()}
            // onFocus={() => this.toggleDropdown()}
            onClick={() => this.toggleDropdown()}
            tabIndex="0"
          >
            <form>
              <input
                className="nav-search-field"
                placeholder="Search"
                onChange={this.handleInputChange}
              />
            </form>
          </div>

          {this.state.open && (
            <NavResults
              {...this.props}
              clearSearch={this.clearSearch}
              handleSelectedEvent={this.props.handleSelectedEvent}
              results={this.state.results}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Search;
