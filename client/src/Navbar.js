import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.renderPreLogin = this.renderPreLogin.bind(this);
        this.renderPostLogin = this.renderPostLogin.bind(this);
        this.changeURL = this.changeURL.bind(this);
    }

    renderPreLogin() {
        return (
          <span>
          <div>
            <button type="button" className="btn btn-outline-primary"onClick={() => this.props.changeView('home')}>Primary</button>
          </div>
            <div id="navbar">
            {/*
            <button id="home" onClick={() => this.props.changeView('home')}>Home</button>
                <button id="log_in" onClick={() => this.props.changeView('logging_in')}>Log In</button>
                <button id="sign_up" onClick={() => this.props.changeView('signing_up')}>Sign Up</button>
            </div>
            */}
                <span id="CodeWithFriends">Code with Friends</span>
                <button id="sign_up" onClick={() => window.location.replace('./signup')}>Sign Up</button>
                <button id="log_in" onClick={() => window.location.replace('./login')}>Log In</button>
                <button id="home" onClick={() => window.location.replace('./home')}>Home</button>
            </div>
            </span>
        )
    }

    changeURL(newPath) {
        var url = new URL(window.location.toString())
        var pathname = url.pathname;
        var newURL = window.location.toString().replace(pathname,newPath)
        console.log(newURL)
        window.location.href = newURL;
    }

    renderPostLogin() {
        return (
            <div id="navbar">
                <span id="CodeWithFriends">Code with Friends</span>
                <button id="logout" onClick={this.props.logout}>Log Out</button>
                <button id="user" onClick={() => this.changeURL('/user_page')}>{this.props.username}</button>
                <button id="problems" onClick={() => this.changeURL('/problems')}>Problems</button>
                <button id="editor" onClick={() => this.changeURL('/editor')}>Editor</button>
            </div>
        )
    }

    render() {
        if (this.props.view === 'home' || this.props.view === 'signup' || this.props.view === 'login') {
            return (
                <React.Fragment>
                    {this.renderPreLogin()}
                </React.Fragment>
            );
        } else if (this.props.view === 'editor' || this.props.view === 'problems' || this.props.view === 'user_page' || this.props.view === 'newProblem') {
            return (
                <React.Fragment>
                    {this.renderPostLogin()}
                </React.Fragment>
            );
        }

    }
}

export default Navbar;
