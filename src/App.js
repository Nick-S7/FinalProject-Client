import React from "react";
import "./App.css";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import AUTH_SERVICE from "./services/AuthService";
import EVENT_SERVICE from "./services/EventService";
import COMMENT_SERVICE from "./services/CommentService";

import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import CreateEvent from "./components/Event/CreateEvent";
import EventDetails from "./components/Event/EventDetails";
// import CreateComment from "./components/Comment/CreateComment";
// import BookDetails from "./components/Book/BookDetails";
// import UpdateBook from "./components/Book/UpdateBook";
import SearchBar from "./components/Search/SearchBar";
import { createEvent } from "@testing-library/react";
import ConcertCategory from './components/ConcertCategory'

export default class App extends React.Component {
  state = {
    currentUser: null,
    authors: [],
    books: [],
    selectedEvent: '',
  };

  componentDidMount = () => {
    Promise.all([
      EVENT_SERVICE.getEvents(),
      COMMENT_SERVICE.getComments(),
      AUTH_SERVICE.getAuthenticatedUser(),
    ])
      .then((responseFromServer) => {
        const { events } = responseFromServer[0].data;
        const { comments } = responseFromServer[1].data;
        const { user } = responseFromServer[2].data;

        this.setState({ events, comments, currentUser: user });
      })
      .catch((err) => console.log(err));

    // AUTHOR_SERVICE.getAuthors()
    //   .then(responseFromServer => {
    //     const { authors } = responseFromServer.data;
    //     this.setState({ authors });

    //     return AUTH_SERVICE.getAuthenticatedUser();
    //   })
    //   .then(responseFromServer => {
    //     const { user } = responseFromServer.data;

    //     this.updateUser(user);
    //   })
    //   .catch(err => console.log(err));
  };

  updateUser = (user) => {
    this.setState({ currentUser: user });
  };

  updateEvents = (event) => {
    const updatedEvents = [...this.state.events, event];
    this.setState({ events: updatedEvents });
  };

  // updateComments = (comment) => {
  //   const updatedComments = [...this.state.comments, comment];
  //   this.setState({ comments: updatedComments });
  // };

  updateEventsAfterDelete = (id) => {
    // BOOK_SERVICE.getBooks()
    //   .then(responseFromServer => {
    //     const { books } = responseFromServer.data;
    //     this.setState({ books });
    //   })
    //   .catch(err => console.log(err));

    const updatedEvents = [...this.state.events];

    updatedEvents.splice(
      updatedEvents.findIndex((event) => event._id === id),
      1
    );

    this.setState({ events: updatedEvents });
  };

  handleSelectedEvent = (event) => {
    this.setState({selectedEvent : event})
    console.log(event ,"=====", this.state.selectedEvent)
  }


  render() {
    console.log("user in client: ", this.state.currentUser);
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <NavBar
              currentUser={this.state.currentUser}
              onUserChange={this.updateUser}
            />
          </nav>
          <Switch>
            {/* <Route path='/somePage' component={someComponent} /> */}
            <Route
              exact
              path="/"
              render={(props) => (
                <Home
                  {...props}
                  handleSelectedEvent = {this.handleSelectedEvent}
                  selectedEvent = {this.state.selectedEvent}
                  events={this.state.events}
                  comments={this.state.comments}
                />
              )}
            />

            <Route
              path="/signup-page"
              render={(props) => (
                <Signup {...props} onUserChange={this.updateUser} />
              )}
            />
            <Route
              path="/login-page"
              render={(props) => (
                <Login {...props} onUserChange={this.updateUser} />
              )}
            />
            <Route path="/Search" render={(props) => <SearchBar />} />

            <ProtectedRoute
              path="/profile"
              authorized={this.state.currentUser}
              redirect={"/signup-page"}
              render={(props) => (
                <Profile {...props} currentUser={this.state.currentUser} />
              )}
            />

            <ProtectedRoute
              path="/api/events/create"
              authorized={this.state.currentUser}
              redirect={"/login-page"}
              render={(props) => (
                <createEvent {...props} onEventsChange={this.updateEvents} />
              )}
            />

            {/* <ProtectedRoute
              path="/comments/create"
              authorized={this.state.currentUser}
              redirect={"/login-page"}
              render={(props) => (
                <CreateComment
                  {...props}
                  events={this.state.events}
                  onCommentsChange={this.updateComments}
                />
              )}
            /> */}

            {/* <ProtectedRoute
              path="/books/:id/edit"
              authorized={this.state.currentUser}
              redirect={"/login-page"}
              render={(props) => (
                <UpdateBook {...props} authors={this.state.authors} />
              )}
            /> */}
            <Route
              path="/events/:id"
              render={(props) => (
                <EventDetails
                  {...props}
                  currentUser={this.state.currentUser}
                  onEventsChangeAfterDelete={this.updateEventsAfterDelete}
                />
              )}
            />

            <Route
              path="/api/events/:id"
              render={(props) => (
                <EventDetails
                  {...props}
                  currentUser={this.state.currentUser}
                  onEventsChangeAfterDelete={this.updateEventsAfterDelete}
                />
              )}
            />

            <Route path="/Search" render={(props) => <SearchBar />} />
            <Route path="/concerts" render={(props) => <ConcertCategory {...props} handleSelectedEvent={this.handleSelectedEvent}/>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
