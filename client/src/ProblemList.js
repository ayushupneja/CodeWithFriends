import React, { Component } from 'react';
import './App.css';

class ProblemList extends Component {
    constructor() {
        super();
        this.state = {
            problems: [],
            doneLoading: false
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/problems", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then((response) => {
                response.json()
                    .then( body => this.setState({ problems: body.problems, doneLoading: true }));
            },
            (error) => {
                alert('Something went wrong sorry :(');
            })
    }

    render() {
        if (this.state.doneLoading === true) {
            var prob_descriptions = this.state.problems.map((problem,i) => 
                <li className="prob_desc" key={i}>{problem.description} submitted by {problem.user}</li>
            );
            return (
                <div className="ProblemList">
                    <ul>
                        {prob_descriptions}
                    </ul>
                </div>
            )
        } else {
            return (
                <p id="test">loading...</p>
            )
        }
    }
}

export default ProblemList;