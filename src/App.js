import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AUTH_SERVICE from "./services/AuthService";
import EVENT_SERVICE from "./services/EventService";
import COMMENT_SERVICE from "./services/CommentService";

import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import EditProfile from "./components/EditProfile";

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import CreateEvent from "./components/Event/CreateEvent";
import EventDetails from "./components/Event/EventDetails";
import CommentForm from "./components/Comment/CommentForm";
//import ListComments from "./components/Comment/ListComments"

import SearchBar from "./components/Search/SearchBar";
import { createEvent } from "@testing-library/react";
import ConcertCategory from "./components/ConcertCategory";
import SportsCategory from "./components/SportsCategory";

export default class App extends React.Component {
  state = {
    currentUser: null,
    authors: [],
    events: [],
    selectedEvent: "",
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
      .catch((err) => {
        console.log(err);
      });
  };

  updateUser = (user) => {
    this.setState({ currentUser: user });
  };

  updateEvents = (event) => {
    const updatedEvents = [...this.state.events, event];
    this.setState({ events: updatedEvents });
  };

  updateComments = (comment) => {
    const updatedComments = [...this.state.comments, comment];
    this.setState({ comments: updatedComments });
  };

  updateEventsAfterDelete = (id) => {
    const updatedEvents = [...this.state.events];

    updatedEvents.splice(
      updatedEvents.findIndex((event) => event._id === id),
      1
    );

    this.setState({ events: updatedEvents });
  };

  handleSelectedEvent = (event) => {
    this.setState({ selectedEvent: event });
    console.log(event, "=====", this.state.selectedEvent);
  };

  render() {
    // const loadingSpin = this.state.loading ? "App-logo-spin" : "App-logo";
    return (
      <div className="App">
        <BrowserRouter>
          <nav>
            <NavBar
              handleSelectedEvent={this.handleSelectedEvent}
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
                  handleSelectedEvent={this.handleSelectedEvent}
                  selectedEvent={this.state.selectedEvent}
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

            <ProtectedRoute
              path="/edit-profile"
              authorized={this.state.currentUser}
              redirect={"/login-page"}
              render={(props) => (
                <EditProfile {...props} currentUser={this.state.currentUser} />
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
                <CreateEvent
                  {...props}
                  currentUser={this.state.currentUser}
                  onEventsChange={this.updateEvents}
                />
              )}
            />

            <ProtectedRoute
              path="/api/events/:eventId/comment"
              authorized={this.state.currentUser}
              redirect={"/login-page"}
              render={(props) => (
                <CommentForm
                  {...props}
                  events={this.state.events}
                  currentUser={this.state.currentUser}
                  onCommentsChange={this.updateComments}
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
            <Route
              path="/concerts"
              render={(props) => (
                <ConcertCategory
                  {...props}
                  handleSelectedEvent={this.handleSelectedEvent}
                />
              )}
            />

            <Route path="/Search" render={(props) => <SearchBar />} />
            <Route
              path="/concerts"
              render={(props) => (
                <ConcertCategory
                  {...props}
                  handleSelectedEvent={this.handleSelectedEvent}
                />
              )}
            />
            <Route
              path="/sports"
              render={(props) => (
                <SportsCategory
                  {...props}
                  handleSelectedEvent={this.handleSelectedEvent}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
