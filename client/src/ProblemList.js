import React, { Component } from 'react';
import './App.css';
import Swal from 'sweetalert2';

//import ReactDOM from 'react-dom'

class ProblemList extends Component {
    constructor() {
        super();
        this.state = {
            problems: [],
            doneLoading: false
        }
        this.loadLeaderBoard = this.loadLeaderBoard.bind(this);
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

    loadLeaderBoard = function(title) {
        fetch('http://localhost:5000/getProblem', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({title: title}),
            mode: 'cors'
        })
        .then((response)=> {
            if (response.status === 200) {
                response.json()
                    .then(
                        prob => {
                            let leaderboard = prob[0].leader_board;
                            let leaderboard_string = "";
                            console.log(leaderboard)
                            leaderboard.forEach((entry) => {
                                leaderboard_string = `${leaderboard_string}<span className="entry">${entry.score} by ${entry.user}</span><br/>`
                            })
                            Swal.fire({
                                title: 'Leaderboard',
                                html: leaderboard_string
                            })
                        }
                    )
            }
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
                        <td><span className="leaderboard" onClick={() => this.loadLeaderBoard(problem.title)}>View Leaderboard</span></td>
                </tr>
            );
            return (
                <table id = "customers">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Difficulty</th>
                            <th>User</th>
                            <th>Leaderboard</th>
                        </tr>
                        {prob_des}
                    </tbody>
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
