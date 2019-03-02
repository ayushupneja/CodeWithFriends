import React, { Component } from 'react';

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
            text: 'int main() {}',
            output: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
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

    render() {
        return (
            <React.Fragment>
                <div id="TextField_And_Button">
                    <div id="Languages">
                        <button className="LanguageButton" style={this.state.language == 'c' ? activeButton : null} onClick={() => this.changeLanguage('c')}>C</button>
                        <button className="LanguageButton" style={this.state.language == 'cpp' ? activeButton : null} onClick={() => this.changeLanguage('cpp')}>C++</button>
                        <button className="LanguageButton" style={this.state.language == 'py' ? activeButton : null} onClick={() => this.changeLanguage('py')}>Python</button>
                    </div>
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