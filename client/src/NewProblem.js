import React, { Component } from 'react';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button';

const activeButton = {
    border: 'solid',
    borderWidth: '1px',
    borderColor: 'black'
  };

class NewProblem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted : false,
            title : '',
            problem_type : 'golf',
            difficulty : 'easy',
            username : this.props.username,
            description : '',
            function_definition : '',
            noTitle : false,
            noDescription : false,
            noFunctionDefinition : false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFunctionDefinitionChange = this.handleFunctionDefinitionChange.bind(this);
        this.changeURL = this.changeURL.bind(this);
    }

    changeDifficulty(diff) {
        this.setState({difficulty : diff});
    }

    changeProblemType(type) {
        this.setState({problem_type : type});
    }

    handleTitleChange(event) {
        this.setState({title : event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({description : event.target.value});
    }

    handleFunctionDefinitionChange(event) {
        this.setState({function_definition : event.target.value});
    }

    handleSubmit() {
        if (this.state.title === '' || this.state.description === '' || this.state.function_definition === '') {
            if (this.state.title === '') 
                this.setState({noTitle : true})
            else
                this.setState({noTitle : false})
            
            if (this.state.description === '')
                this.setState({noDescription : true})
            else
                this.setState({noDescription : false})

            if (this.state.function_definition === '')
                this.setState({noFunctionDefinition : true})
            else
                this.setState({noFunctionDefinition : false})
        } else {
            this.setState({noTitle : false})
            this.setState({noDescription : false})
            this.setState({noFunctionDefinition : false})

            fetch('http://localhost:5000/problems', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    title: this.state.title,
                    problem_type: this.state.problem_type,
                    difficulty: this.state.difficulty,
                    username: this.state.username,
                    description: this.state.description,
                    function_definition: this.state.function_definition
                })
            })
            .then( (response) => {
                if (response.status === 200)
                    this.setState({submitted : true})
                else
                    alert('something went wrong')
            })
        }


        
    }

    changeURL(newPath) {
        var url = new URL(window.location.toString())
        var pathname = url.pathname;
        var newURL = window.location.toString().replace(pathname,newPath)
        console.log(newURL)
        window.location.href = newURL;
    }



    render() {


        if (this.state.submitted === false) { 
        return (
                <div id="postProblemForm">
                        <div>Problem title:</div>
                        <input className="formInput" type="text" value={this.state.title} onChange={this.handleTitleChange} />
                        <div className="alertText">{this.state.noTitle === true ? 'Please enter a title' : ''}</div>
                        <div>Problem Type:</div>
                        <DropdownButton title={this.state.problem_type}>
                            <Dropdown.Item style={this.state.problem_type === 'golf' ? activeButton : null} onClick={() => this.changeProblemType('golf')}>golf</Dropdown.Item>
                        </DropdownButton>
                        <div>Difficulty:</div>
                        <DropdownButton title={this.state.difficulty}>
                            <Dropdown.Item style={this.state.difficulty === 'easy' ? activeButton : null} onClick={() => this.changeDifficulty('easy')}>easy</Dropdown.Item>
                            <Dropdown.Item style={this.state.difficulty === 'medium' ? activeButton : null} onClick={() => this.changeDifficulty('medium')}>medium</Dropdown.Item>
                            <Dropdown.Item style={this.state.difficulty === 'hard' ? activeButton : null} onClick={() => this.changeDifficulty('hard')}>hard</Dropdown.Item>
                        </DropdownButton>                    
                        <div>Description:</div>
                        <textarea onChange={this.handleDescriptionChange} className="formDescription" rows="4"></textarea>
                        <div className="alertText">{this.state.noDescription === true ? 'Please enter a description' : ''}</div>
                        <div>Function Definition:</div>
                        <input type="text" className="formInput" value={this.state.function_definition} onChange={this.handleFunctionDefinitionChange} />
                        <div className="alertText">{this.state.noFunctionDefinition === true ? 'Please enter a function definition' : ''}</div>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                </div>
            )
        } else {
            return (
                <React.Fragment>
                    <div id="postProblemForm">
                        <h4 id="browsingText">Thanks for submitting your problem!</h4>
                        <br/>
                        <Button id="browsingButton" onClick={() => this.changeURL('/problems')}>Continue Browsing Problems</Button>
                    </div>
                </React.Fragment>
            )
        }
    }

}

export default NewProblem;