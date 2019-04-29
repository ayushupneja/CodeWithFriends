import React, { Component } from 'react';
import './App.css';
//import ReactDOM from 'react-dom'

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
                alert(error);
            })
    }

    render() {
        if (this.state.doneLoading === true) {
            /*
            var prob_des = this.state.problems.map((problem,i) =>
                <li className="prob_desc" key={i}>{problem.description} submitted by {problem.user}</li>
            );
            */
            var prob_des = this.state.problems.map((problem,i) =>
                <tr className="prob_desc" key = {i}>
                        <td><span className="prob_title"><a href={"/editor/" + problem.title.split(' ').join('+')}>{problem.title}</a></span></td>
                        <td><span className="prob_type">{problem.problem_type}</span></td>
                        <td><span className="prob_difficulty">{problem.difficulty}</span></td>
                        <td><span className="prob_user">{problem.user}</span></td>
                </tr>
            );
            return (
                <table id = "customers">
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Difficulty</th>
                    <th>User</th>
                </tr>
                    {prob_des}
                </table>
            )
        } else {
            return (
                <p id="test">loading...</p>
            )
        }
    }
}

export default ProblemList;
