import React, { Component } from 'react';
import './App.css';
import { Preloader, Placeholder } from 'react-preloading-screen';


class Friend extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        //this.handleInvite = this.handleInvite.bind(this);
    }
/*
    handleInvite() {
        this.props.newRoom();
        this.connection = new WebSocket('ws://' + window.location.hostname + ':5000/newroom/' + this.props.username);
        this.connection.onmessage = (e) => {
            console.log('Message from server:',e.data);
            this.props.setText(e.data);
            this.props.setTextArea(e.data);
        }
    }
*/
    render() {
        return (
            <React.Fragment>
                <div className="Friend">
                    <span>{this.props.friend}</span>
                    <span><button className='Invite' onClick={this.props.handleInvite}>Invite</button></span>
                </div>
            </React.Fragment>
        )
    }
}

export default Friend;
