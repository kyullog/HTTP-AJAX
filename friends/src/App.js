import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import FriendsList from "./Components/FriendsList";
import AddFriendForm from "./Components/AddFriendForm";
import Friend from "./Components/Friend";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    this.updateState();
  }

  updateState = () => {
    axios
      .get("http://localhost:5000/friends")
      .then(response => {
        console.log(response);
        this.setState({ friends: response.data });
      })
      .catch(err => console.log(err));
  };

  deleteFriend = id => {
    axios
      .delete(`http://localhost:5000/friends/${id}`)
      .then(response => {
        console.log(response);
        this.updateState();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          exact
          render={props => (
            <FriendsList
              {...props}
              friends={this.state.friends}
              deleteFriend={this.deleteFriend}
            />
          )}
        />
        <Route
          path="/addfriend"
          render={props => {
            return <AddFriendForm {...props} refresh={this.updateState} />;
          }}
        />
        <Route
          path="/:id"
          render={props => (
            <Friend
              friend={this.state.friends}
              deleteFriend={this.deleteFriend}
              refresh={this.updateState}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
