import React, { Component } from 'react';
import './App.css';

class FriendRequest extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="friendRequest">
                    <span>{this.props.username}</span>
                    <button className="choiceButton">Decline</button>
                    <button className="choiceButton">Accept</button>
                </div>
            </React.Fragment>
        )
    }
}

export default FriendRequest;