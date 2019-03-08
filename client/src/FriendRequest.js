import React, { Component } from 'react';
import './App.css';

class FriendRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleted: false
        }
        this.acceptRequest = this.acceptRequest.bind(this);
        this.fetchRequests = this.fetchRequests.bind(this);
    }

    acceptRequest() {
        console.log(this.props.myusername, this.props.username);
        fetch('http://localhost:5000/acceptRequest', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                sender: this.props.username,
                receiver: this.props.myusername
            })
        })
        .then((response => {
            if (response.status === 200) {
                this.fetchRequests();
            }
        }))
        .catch((e) => console.log(e))
    }

    fetchRequests() {
        console.log('wut');
        fetch('http://localhost:5000/friendRequests/' + this.props.myusername, {
            method: 'GET',
            mode: 'cors'
        })
        .then( (response) => {
            response.json()
            .then((requests) => {
                console.log(requests.friendRequests);
                console.log('hello world');
                this.props.handler(requests.friendRequests);
                this.setState({deleted : true});
            })
        })
        .catch( (e) => console.log(e))
    }


    render() {
        if (this.state.deleted === false) {
        return (
            <React.Fragment>
                <div className="friendRequest">
                    <span>{this.props.username}</span>
                    <button className="choiceButton">Decline</button>
                    <button className="choiceButton" onClick={() => this.acceptRequest(this.props.username)}>Accept</button>
                </div>
            </React.Fragment>
        );
        } else {
            return null;
        }
    }
}

export default FriendRequest;