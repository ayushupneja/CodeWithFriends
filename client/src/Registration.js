import React, { Component } from 'react';
import './App.css';

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            success: false,
            taken : false
        }
        this.handleTakenChange = this.handleTakenChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
    }

    handleTakenChange() {
        this.setState({taken : true});
    }

    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit() {
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
        .then( (response) => {
            console.log(response.status);
            if (response.status === 200) {
                this.setState( {success : true} );
            } else if (response.status === 409){
                this.handleTakenChange();
            }
        })
    }

    render() {
        if (this.state.success === false) {
            if (this.state.taken === false)
            return (
                <div id="registration">
                    <form onSubmit={() => {return false;}}>
                        <p className="userpass">Username:</p>
                        <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                        <br/>
                        <p className="userpass">Password:</p>
                        <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
                        <br/>
                        <div id = "sign_in">
                          <button type="button" onClick={this.handleSubmit}class="btn btn-primary btn-lg">Create Account</button>
                        </div>
                    </form>
                </div>
            );
            else
                return (
                    <div id="registration">
                        <p class="failtext">That username is already taken</p>
                        <form onSubmit={() => {return false;}}>
                            <p className="userpass">Username:</p>
                            <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                            <br/>
                            <p className="userpass">Password:</p>
                            <input type="text" value={this.state.password} onChange={this.handlePasswordChange}/>
                            <br/>
                            <button type="button" onClick={this.handleSubmit}>Sign Up</button>
                        </form>
                    </div>
                );
        } else {
            return (
                <div id="registration">
                    <p className="successtext">Sign Up Successful!</p>
                </div>
            );
        }
    }
}

export default Registration;
