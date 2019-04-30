import React, { Component } from 'react';
import { Preloader, Placeholder } from 'react-preloading-screen';


class Register extends Component {
    render() {
        return (
            <div class="register">
            <Preloader>
              <Placeholder>
                  <span>
                  </span>
              </Placeholder>
            </Preloader>
                <form action="http://localhost:3000/login" method="post">
                Username: <br/>
                <input type="text" name="username"></input>
                <br/>
                <br/>
                Password: <br/>
                <input type="text" name="password"></input>
                <br/>
                <br/>
                <input type="submit" value="Sign Up"></input>\
                </form>
            </div>
        );
    }
}

export default Register;
