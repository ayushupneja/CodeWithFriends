import React, { Component } from 'react';
import './App.css';

class Friend extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="Friend">
                    <span>{this.props.friend}</span>
                </div>
            </React.Fragment>
        )
    }
}

export default Friend;