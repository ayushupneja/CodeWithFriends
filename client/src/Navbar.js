import React, { Component } from 'react';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.renderPreLogin = this.renderPreLogin.bind(this);
        this.renderPostLogin = this.renderPostLogin.bind(this);
    }

    renderPreLogin() {
        return (
            <div id="navbar">
                <button id="home" onClick={() => this.props.changeView('home')}>Home</button>
                <button id="log_in" onClick={() => this.props.changeView('logging_in')}>Log In</button>
                <button id="sign_up" onClick={() => this.props.changeView('signing_up')}>Sign Up</button>
            </div>           
        )
    }

    renderPostLogin() {
        return (
            <div id="navbar">
                <button id="editor" onClick={() => this.props.changeView('editor')}>Editor</button>
                <button id="problems" onClick={() => this.props.changeView('problems')}>Problems</button>
                <button id="user" onClick={() => this.props.changeView('user_page')}>{this.props.username}</button>
                <button id="logout" onClick={this.props.logout}>Log Out</button>
            </div>            
        )
    }

    render() {
        if (this.props.view === 'home' || this.props.view === 'signing_up' || this.props.view === 'logging_in') {
            return (
                <React.Fragment>
                    {this.renderPreLogin()}
                </React.Fragment>
            );
        } else if (this.props.view === 'editor' || this.props.view === 'problems' || this.props.view === 'user_page') {
            return (
                <React.Fragment>
                    {this.renderPostLogin()}
                </React.Fragment>
            );
        }

    }
}

export default Navbar;