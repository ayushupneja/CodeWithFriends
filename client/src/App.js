import React, { Component } from 'react';
//import ReactDOM from 'react-dom'
import './App.css';
import Registration from './Registration';
import Login from './Login';
import TextField from './TextField';
import ProblemList from './ProblemList';
import Navbar from './Navbar';
import Friends from './Friends';
import Typist from 'react-typist'


class App extends Component {
  constructor(props) {
    super(props);
    var url = new URL(window.location.href);
    var path = url.pathname;

    var lastState = localStorage.getItem('lastState');
    lastState = JSON.parse(lastState);
    console.log(lastState);
    console.log(localStorage.getItem("test"));
    var view = 'home';

    if (path !== '/') {
      if (path.indexOf('/',1) === -1) {
        view = path.substring(1);
      } else {
        view = path.substring(1,path.indexOf('/',1))
      }
    }

    if (lastState == null) {
      this.state = {
        view : 'home',
        username : '',
        token : '',
        doneLoggingIn : false
      }
    } else {
      this.state = {
        view : view,
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
          var url = new URL(window.location.toString())
          var pathname = url.pathname
          var newURL = window.location.toString().replace(pathname,'/home')
          window.location.href = newURL
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div id="sign_in">
          <Typist
            avgTypingDelay = {100}
            startDelay = {1500}
            cursor = {{show: false}}>
            <h1>Code.</h1>
            <Typist.Backspace count={5} delay={1500} />
            <Typist.Delay ms={500} />
            <h1>Collaborate.</h1>
            <Typist.Backspace count={12} delay={1500} />
            <Typist.Delay ms={500} />
            <h1>Compete.</h1>
            <Typist.Backspace count={8} delay={1500} />
            <Typist.Delay ms={500} />
            <h1>Hackable.</h1>
          </Typist>

        </div>
        <div id = "sign_in">
          <button type="button" class="btn btn-primary btn-lg" onClick={() => window.location.replace('./signup')}>Create Account</button>
        </div>
        </div>
      );
    if (this.state.view === 'signup')
      return (
        <Registration/>
      );
    if (this.state.view === 'login')
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
