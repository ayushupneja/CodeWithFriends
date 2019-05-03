import React, { Component } from 'react';
import './App.css';
import FriendRequest from './FriendRequest';
import Friend from './Friend';


class Friends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            friends: [],
            addWho: ''
        }
        this.handleRequest = this.handleRequest.bind(this);
        this.handleAddWhoChange = this.handleAddWhoChange.bind(this);
        this.fetchRequests = this.fetchRequests.bind(this);
        this.handleRequestChange = this.handleRequestChange.bind(this);
        this.handleFriendChange = this.handleFriendChange.bind(this);
        this.fetchFriends = this.fetchFriends.bind(this);
    }

    componentDidMount() {
        this.fetchRequests();
        this.fetchFriends();
    }

    handleRequest() {
        fetch('http://localhost:5000/addFriend', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                receiver: this.state.addWho,
                sender: this.props.username
            })
        })
        .then( (response) => {
            if (response.status === 404) {
                // Change this to something better later but good enough for now
                alert("Couldn't find this user :(");
            } else {
                this.fetchRequests();
                alert("Friend added!");
            }
            })
        .catch( () => alert('hmmmmm'))
    }

    handleAddWhoChange(event) {
        console.log(this.state.friends);
        this.setState({addWho: event.target.value});
    }

    handleRequestChange(x) {
        this.setState({requests: x});
    }

    handleFriendChange(x) {
        console.log("??????");
        this.setState({friends: x});
    }

    /*
    renderFriends() {
        fetch('http://localhost:5000/addFriend', {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            mode : 'cors',
            body: JSON.stringify({
                username: this.props.username
            })
        })
    }
    */

    fetchRequests() {
        fetch('http://localhost:5000/friendRequests/' + this.props.username, {
            method: 'GET',
            mode: 'cors'
        })
        .then( (response) => {
            response.json()
            .then((requests) => {
                console.log(requests.friendRequests);
                this.setState({ requests: requests.friendRequests});
            })
        })
        .catch( (e) => console.log(e))
    }

    fetchFriends() {
        console.log('asdhfkjahsdjkflashdkljfhkjsadl');
        fetch('http://localhost:5000/friends/' + this.props.username, {
            method: 'GET',
            mode: 'cors'
        })
        .then( (response) => {
            response.json()
            .then((friends) => {
                console.log(friends.friends);
                this.setState({friends : friends.friends});
            })
        })
        .catch( (e) => console.log(e))
    }

    render() {
        return (
            <React.Fragment>
                <div id="AddFriend">
                    <form onSubmit={() => {return false;}}>
                    <p>Add Friend:</p>
                    <input type="text" value={this.state.addWho} onChange={this.handleAddWhoChange}></input>
                    <button type="button" onClick={this.handleRequest}>Add Friend</button>
                    </form>
                </div>
                <div id="Friends">
                    <h2>Incoming Friend Requests</h2>
                    {this.state.requests.map( (r,i) => {
                        if (r.sender !== this.props.username)
                            return (<FriendRequest key={i} myusername={this.props.username} username={r.sender} requests={this.state.requests} handler={this.handleRequestChange} handler2={this.handleFriendChange}/>)
                        else
                            return (null);
                    })}
                    <h2>Friends</h2>
                    {this.state.friends.map( (f,i) => {
                        return (<Friend key={i} friend={f}/>)
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default Friends;
