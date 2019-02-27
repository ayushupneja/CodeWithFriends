import React, { Component } from 'react';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import TextField from './TextField';
import ProblemList from './ProblemList';

// Todo: collapse navbar into a single component. Probably have to do stuff with props for that

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view : 'home',
      username : '',
      token : ''
    }

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleCompile = this.handleCompile.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleDashboard = this.handleDashboard.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleProblems = this.handleProblems.bind(this);
  }
  
  handleSignUp() {
    this.setState({view : 'signing_up'});
  }

  handleCompile() {
    alert("Ur mom gay!");
  }

  handleLogIn() {
    this.setState({view : 'logging_in'});
  }

  handleHome() {
    this.setState({view : 'home'});
  }

  handleDashboard() {
    this.setState({view : 'dashboard'});
  }

  handleUsername(name) {
    this.setState({username : name});
  }

  handleToken(mytoken) {
    this.setState({token : mytoken});
  }

  handleLogout() {
    fetch('http://localhost:5000/logout', {
      method: 'DELETE',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({username: this.state.username}),
      mode: 'cors'
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          this.setState({view : 'home'});
        }
        else {
          alert('epic fail');
        }
      })
  }

  handleProblems() {
    this.setState({ view : 'problems' });
  }

  render() {
    if (this.state.view === 'home') {
      return (
        <React.Fragment>
          <div id="navbar">
            <button id="home" onClick={this.handleHome}>Home</button>
            <button id="log_in" onClick={this.handleLogIn}>Log In</button>
            <button id="sign_up" onClick={this.handleSignUp}>Sign Up</button>
          </div>
          <div id="welcome">
            Welcome, idiot
          </div>
        </React.Fragment>
        );
    } else if (this.state.view === 'signing_up') {
        return (
          <React.Fragment>
            <div id="navbar">
              <button id="home" onClick={this.handleHome}>Home</button>
              <button id="log_in" onClick={this.handleLogIn}>Log In</button>
              <button id="sign_up" onClick={this.handleSignUp}>Sign Up</button>
            </div>
            <Registration/>
          </React.Fragment>
        );
     } else if (this.state.view === 'logging_in') {
       return (
         <React.Fragment>
           <div id="navbar">
            <button id="home" onClick={this.handleHome}>Home</button>
            <button id="log_in" onClick={this.handleLogIn}>Log In</button>
            <button id="sign_up" onClick={this.handleSignUp}>Sign Up</button>
           </div>
           <Login view={this.handleDashboard.bind(this)} name={this.handleUsername.bind(this)} token={this.handleToken.bind(this)}/>
         </React.Fragment>
       )
     } else if (this.state.view === 'dashboard') {
       console.log(this.state.token);
       return (
        <React.Fragment>
          <div id="navbar">
            <button id="problems" onClick={this.handleProblems}>Problems</button>
            <button id="user">{this.state.username}</button>
            <button id="logout" onClick={this.handleLogout}>Log Out</button>
          </div>
          <TextField/>
        </React.Fragment>
       );
     } else if (this.state.view === 'problems') {
        return (
          <React.Fragment>
            <div id="navbar">
              <button id="problems" onClick={this.handleProblems}>Problems</button>
              <button id="user">{this.state.username}</button>
              <button id="logout" onClick={this.handleLogout}>Log Out</button>
            </div>
            <ProblemList/>
          </React.Fragment>
        );
     }
  }
}



export default App;
