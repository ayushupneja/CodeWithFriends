import React, { Component } from 'react';

class TextField extends Component {
    constructor(props) {
        super(props);
        this.state ={
            text: 'int main(){}',
            output: ''
        }
        this.test = this.test.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
    }

    componentDidMount() {
        document.getElementById('TextField').addEventListener('input', this.handleChange);
    }

    componentWillUnmount() {
        document.getElementById('TextField').removeEventListener('input', this.handleChange);
    }

    handleChange() {
        this.setState({text: document.getElementById('TextField').innerText});
    }

    test() {
        alert(this.state.text);
    }

    handleSubmission() {
        fetch('http://localhost:5000/submissions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.props.username,
                submission: this.state.text
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

    render() {
        return (
            <React.Fragment>
                <div id="TextField_And_Button">
                    <div id="TextField" contentEditable="true" spellCheck="false">
                    </div>
                    <div id="OutputField">
                        Output:
                        <br/>
                        {this.state.output}
                    </div>
                    <button id="Run_Button" onClick={this.handleSubmission}>Run</button>
                </div>
            </React.Fragment>
        )
    }
}

export default TextField;