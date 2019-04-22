import React, { Component } from 'react';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import TextField from './TextField';
import ProblemList from './ProblemList';
import Navbar from './Navbar';
import Friends from './Friends';

class App extends Component {
  constructor(props) {
    super(props);
    var url = new URL(window.location.href);
    var path = url.pathname;

    var lastState = localStorage.getItem('lastState');
    lastState = JSON.parse(lastState);
    console.log(lastState);
    console.log(localStorage.getItem("test"));

    if (lastState == null) {
      this.state = {
        view : 'home',
        username : '',
        token : '',
        doneLoggingIn : false
      }
    } else {
      this.state = {
        view : path.indexOf('/',1) != -1 ? path.substring(1,path.indexOf('/',1)) : 'home',
        username : lastState.username,
        token : lastState.token,
        doneLoggingIn : lastState.doneLoggingIn
      }
    }
/*
    this.state = {
      view : path.indexOf('/',1) != -1 ? path.substring(1,path.indexOf('/',1)) : 'home',
      username : '',
      token : '',
      doneLoggingIn : false
    }
    */
/*
    //alert(window.location.href);
    var url = new URL(window.location.href);
    var path = url.pathname;
    //alert(path.substring(1,path.indexOf('/',1)));
    alert(path.indexOf('/',1));
*/
    this.handleEditor = this.handleEditor.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.changeView = this.changeView.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.finishLogin = this.finishLogin.bind(this);
  }

  handleEditor() {
    this.setState({view : 'editor'});
  }

  handleUsername(name) {
    this.setState({username : name});
  }

  handleToken(mytoken) {
    this.setState({token : mytoken});
  }

  changeView(newView) {
    this.setState({ view: newView});
  }

  finishLogin() {
    this.setState({ doneLoggingIn: true});
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

  renderBody() {
    if (this.state.view === 'home')
      return (
        <div>
        <div id="welcome">
          <p>
          Welcome idiot
          </p>
        </div>
        <div id = "sign_in">
          <button type="button" class="btn btn-primary btn-lg">Create Account</button>
        </div>
        </div>
      );
    if (this.state.view === 'signing_up')
      return (
        <Registration/>
      );
    if (this.state.view === 'logging_in')
      return (
        <Login view={this.handleEditor.bind(this)} name={this.handleUsername.bind(this)} token={this.handleToken.bind(this)} done={this.finishLogin.bind(this)}/>
      );
    if (this.state.view === 'editor' && this.state.doneLoggingIn === true)
      return (
        <TextField username={this.state.username} test={'abcd'}/>
      );
    if (this.state.view === 'problems')
      return (
        <ProblemList/>
      );
    if (this.state.view === 'user_page')
      return (
        <Friends username={this.state.username}/>
      );
  }

  render() {
    console.log(this.state);
    console.log("storing....");
    localStorage.setItem('lastState',JSON.stringify(this.state));
    localStorage.setItem('test',"hello world");
    return (
      <React.Fragment>
        <Navbar view={this.state.view} username={this.state.username} changeView={this.changeView.bind(this)} logout={this.handleLogout.bind(this)}/>
        {this.renderBody()}
      </React.Fragment>
    )
  }
  /*
  render() {
    if (this.state.view === 'home') {
      return (
        <React.Fragment>
          <Navbar view={this.state.view} username={this.state.username} changeView={this.changeView.bind(this)} logout={this.handleLogout.bind(this)}/>
          <div id="welcome">
            Welcome, idiot
          </div>
        </React.Fragment>
        );
    } else if (this.state.view === 'signing_up') {
        return (
          <React.Fragment>
            <Navbar view={this.state.view} username={this.state.username} changeView={this.changeView.bind(this)} logout={this.handleLogout.bind(this)}/>
            <Registration/>
          </React.Fragment>
        );
     } else if (this.state.view === 'logging_in') {
       return (
         <React.Fragment>
           <Navbar view={this.state.view} username={this.state.username} changeView={this.changeView.bind(this)} logout={this.handleLogout.bind(this)}/>
           <Login view={this.handleEditor.bind(this)} name={this.handleUsername.bind(this)} token={this.handleToken.bind(this)}/>
         </React.Fragment>
       )
     } else if (this.state.view === 'editor') {
       console.log(this.state.token);
       return (
        <React.Fragment>
          <Navbar view={this.state.view} username={this.state.username} changeView={this.changeView.bind(this)} logout={this.handleLogout.bind(this)}/>
          <TextField username={this.state.username}/>
        </React.Fragment>
       );
     } else if (this.state.view === 'problems') {
        return (
          <React.Fragment>
             <Navbar view={this.state.view} username={this.state.username} changeView={this.changeView.bind(this)} logout={this.handleLogout.bind(this)}/>
            <ProblemList/>
          </React.Fragment>
        );
     }
  }
  */
}



export default App;
