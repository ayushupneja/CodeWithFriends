import React, { Component } from 'react';

class TextField extends Component {
    constructor() {
        super();
        this.state ={
            text: 'Hello World!'
        }
    }

    render() {
        return (
            // Probably need to use jQuery here to see when content changes and update state..
            // Although I'm not really sure if it's necessary
            <div id="TextField" contentEditable="true">
                {this.state.text}
            </div>
        )
    }
}

export default TextField;