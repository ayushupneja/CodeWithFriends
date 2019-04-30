import React, { Component } from 'react';
import './App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            failed: false
        }
        this.handleFail = this.handleFail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleFail() {
        this.setState({failed : true});
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        var base64encodedData = new Buffer(this.state.username + ':' + this.state.password).toString('base64');
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64encodedData
            },
            body: JSON.stringify({username: this.state.username, password: this.state.password}),
            mode: 'cors',
        })
            .then((response) => {
                if (response.status === 200) {
                    //this.props.view();
                    this.props.name(this.state.username);
                    this.props.done();
                    response.json()
                        .then(
                            body => this.props.token(body.session._id),
                            window.location.replace('./editor')
                        );
                }
                else
                    this.handleFail();
            })
            // can do something better in the else laterr... like update the component state and render something else
            .catch(() => alert('should never get here'))
    }



    render() {
        if (this.state.failed === false) {
            return (
                <div id="login">
                    <form onSubmit={() => {return false;}}>
                          <br/>
                          <br/>
                          <input type="text" value={this.state.username} placeholder="Username" onChange={this.handleUsernameChange}/>
                          <br/>
                          <br/>
                          <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} min = "6" required/>
                          <br/>
                          <div id = "sign_in">
                            <button type="button" onClick={this.handleSubmit}className="btn btn-primary btn-lg">Log In</button>
                          </div>
                    </form>
                </div>
            );
        } else {
            return (
                 <div id="login">
                    <p className="failtext">Login Failed. Try again</p>
                        <br/>
                        <form onSubmit={() => {return false;}}>
                        <br/>
                        <br/>
                        <input type="text" value={this.state.username} placeholder="Username" onChange={this.handleUsernameChange}/>
                        <br/>
                        <br/>
                        <input type="password" value={this.state.password} placeholder="Password" onChange={this.handlePasswordChange} min = "6" required/>
                        <br/>
                        <div id = "sign_in">
                          <button type="button" onClick={this.handleSubmit}className="btn btn-primary btn-lg">Log In</button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default Login;
