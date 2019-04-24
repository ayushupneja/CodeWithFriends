import React, { Component } from 'react';
import Friend from './Friend';

const activeButton = {
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'black'
  };

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state ={
            language: 'c',
            text: '',
            output: '',
            room: false,
            friends: [],
            doneLoadingFriends: false,
            doneLoadingProblems: false,
            problem: undefined
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.fetchFriends = this.fetchFriends.bind(this);
        this.renderFriends = this.renderFriends.bind(this);
        this.fetchProblem = this.fetchProblem.bind(this);
    }


    fetchFriends() {
        fetch('http://localhost:5000/friends/' + this.props.username, {
          method: 'GET',
          mode: 'cors'
        })
        .then( (response) => {
          response.json()
          .then((friends) => {
            this.setState({friends: friends.friends, doneLoadingFriends: true});
          })
        })
        .catch( (e) => console.log(e))
      }

    fetchProblem() {
        var url = new URL(window.location.href);
        var path = url.pathname;
        var title = path.substring(path.lastIndexOf('/') + 1)
        fetch('http://localhost:5000/getProblem', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({title: title}),
            mode: 'cors'
        })
        .then( (response) => {
            if (response.status === 200 ) {
                response.json()
                    .then(
                        prob => {
                            console.log('yyyyyyyyyyyy' + prob.length)
                            console.log(prob)
                            if (prob.length != 0) {
                                this.state.problem = prob
                                this.setState({ doneLoadingProblems : true})
                            }
                           
                        }
                    )
            }
            else
                console.log('whoops')
        })
    }
 
    componentDidMount() {
        document.getElementById('TextField').addEventListener('input', this.handleChange);
        this.fetchFriends();
        this.fetchProblem();
        /* Websocket Stuff */
        //this.connection = new WebSocket('ws://' + window.location.hostname + ':5000/echo/' + this.props.username);
        /*
        this.connection.onopen = () => {
            this.connection.send('Opening Connection');
        }
        */
       /*
        this.connection.onmessage = e => {
            console.log('Message from server:', Object.keys(e));
        }
        */
    }
/*
    componentDidUpdate(prevProps) {
        // Need to make sure to close the websocket when logout (and maybe change page)
        if (this.props.username !== prevProps.username) {
            this.connection = new WebSocket('ws://' + window.location.hostname + ':5000/echo/' + this.props.username);
            this.connection.onmessage = (e) => {
                console.log('Message from server:',e.data);
                this.setState({ text: e.data});
                document.getElementById('TextField').innerHTML = this.state.text;
            }
        }
    }
*/

    handleCreateRoom() {
        this.setState({ room: true});
        this.connection = new WebSocket('ws://' + window.location.hostname + ':5000/newroom/' +  this.props.username + '/' + this.props.username);
        this.connection.onmessage = (e) => {
            console.log('Message from server:',e.data);
            this.setState({ text: e.data});
            document.getElementById('TextField').innerHTML = this.state.text;
        }
    }
/*
    componentDidUpdate(prevProps) {
        // Need to make sure to close the websocket when logout (and maybe change page)
        // Using Date.now() as temporary token. Not sure what to use for this later.
            if (this.props.username !== prevProps.username) {
                this.connection = new WebSocket('ws://' + window.location.hostname + ':5000/rooms/' + Date.now() + '/' +  this.props.username);
                this.connection.onmessage = (e) => {
                    console.log('Message from server:',e.data);
                    this.setState({ text: e.data});
                    document.getElementById('TextField').innerHTML = this.state.text;
                }
            }
        
    }
    */

    componentWillUnmount() {
        document.getElementById('TextField').removeEventListener('input', this.handleChange);
    }

    handleChange() {
        this.setState({text: document.getElementById('TextField').innerText});

        /* WebSocket stuff */
        if (this.state.room === true) {
            this.connection.send(this.state.text);

        //this.conne
            console.log(this.state.text);
        }
    }

    /*
    function setEndOfContenteditable(contentEditableElement) {
        var range,selection;
        if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
        {
            range = document.createRange();//Create a range (a range is a like the selection but invisible)
            range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            selection = window.getSelection();//get the selection object (allows you to change selection)
            selection.removeAllRanges();//remove any selections already made
            selection.addRange(range);//make the range you have just created the visible selection
        }
        else if(document.selection)//IE 8 and lower
        { 
            range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
            range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
            range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
            range.select();//Select the range (make it the visible selection
        }
    }
    */

    /*
    moveCursor() {
        var el = document.getElementById("editable");
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(el.childNodes[2], 5);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    */

    handleSubmission() {
        fetch('http://localhost:5000/submissions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.props.username,
                submission: this.state.text,
                language: this.state.language
            }),
            mode: 'cors',
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json()
                        .then( body => this.setState({ output : body.output}));
                } else {
                    console.log("Submission failed");
                }
            })
            .catch(() => alert('uh oh'))
    }

    changeLanguage(newLanguage) {
        this.setState({language : newLanguage})
    }

    renderProblem() {
        console.log("hello!")
        if (this.state.doneLoadingProblems === true) {
            let problem = this.state.problem[0]
            console.log(this.state.problem)
            console.log("hello2!")
            return (
                <div id="EditorProblem">
                    <h2>{problem.title}</h2>
                    <span id="EditorProblemDescription">{problem.description}</span>
                    <br/>
                    <span id="EditorProblemType">Problem Type: {problem.problem_type}</span>
                    <br/>
                    <span id="EditorProblemDifficulty">Difficulty: {problem.difficulty}</span>
                    <br/>
                    <span id="EditorSubmittedBy">Submitted by: {problem.user}</span>
                </div>
            );
        }
    }

    renderFriends() {
        
        if (this.state.doneLoadingFriends === true) {
            return (
                <div id="Friends">
                    <h2>Friends</h2>
                    {this.state.friends.map( (f,i) => {
                        return (<Friend key={i} friend={f} handleInvite={this.handleCreateRoom}/>)
                        //return (<Friend key={i} friend={f} username={this.props.username} newRoom={() => this.setState({room:true})} setText={(t) => this.setState({text:t})} setTextArea={(t) => document.getElementById('TextField').innerHTML = t}/>)
                    })}
                </div>
            );
        }
        
    }

    render() {
        return (
            <React.Fragment>
                {this.renderProblem()}
                <div id="TextField_And_Button">
                    <div id="Languages">
                        <button className="LanguageButton" style={this.state.language === 'c' ? activeButton : null} onClick={() => this.changeLanguage('c')}>C</button>
                        <button className="LanguageButton" style={this.state.language === 'cpp' ? activeButton : null} onClick={() => this.changeLanguage('cpp')}>C++</button>
                        <button className="LanguageButton" style={this.state.language === 'py' ? activeButton : null} onClick={() => this.changeLanguage('py')}>Python</button>
                    </div>
                    <div id="TextField" contentEditable="true" spellCheck="false">
                    </div>
                    <div id="OutputField">
                        Output:
                        <br/>
                        {this.state.output}
                    </div>
                    <button onClick={this.handleCreateRoom}>Create Room</button>
                    <button id="Run_Button" onClick={this.handleSubmission}>Run</button>
                </div>
                {this.renderFriends()}
            </React.Fragment>
        )
    }
}

export default TextField;