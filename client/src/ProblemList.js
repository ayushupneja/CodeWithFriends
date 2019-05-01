import React, { Component } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import { Preloader, Placeholder } from 'react-preloading-screen';
import $ from 'jquery';

//import ReactDOM from 'react-dom'

class ProblemList extends Component {
    constructor() {
        super();
        this.state = {
            problems: [],
            doneLoading: false
        }
        this.loadLeaderBoard = this.loadLeaderBoard.bind(this);
        this.changeURL = this.changeURL.bind(this);
    }

    componentDidMount() {
        $('body').addClass('stop-scrolling')
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

    componentWillUnmount() {
        $('body').removeClass('stop-scrolling')
    }

    changeURL(newPath) {
        var url = new URL(window.location.toString())
        var pathname = url.pathname;
        var newURL = window.location.toString().replace(pathname,newPath)
        console.log(newURL)
        window.location.href = newURL;
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
           /*
            var prob_des = this.state.problems.map((problem,i) =>
                <tr className="prob_desc" key = {i}>
                        <td><span className="prob_title"><a href={"/editor/" + problem.title.split(' ').join('+')}>{problem.title}</a></span></td>
                        <td><span className="prob_type">{problem.problem_type}</span></td>
                        <td><span className="prob_difficulty">{problem.difficulty}</span></td>
                        <td><span className="prob_user">{problem.user}</span></td>
                        <td><span className="leaderboard" onClick={() => this.loadLeaderBoard(problem.title)}>View Leaderboard</span></td>
                </tr>
                
            );
            */

           var prob_des = this.state.problems.map((problem,i) =>
                <div className="probRow" key={i}>
                    <span className="prob_title"><a href={"/editor/" + problem.title.split(' ').join('+')}>{problem.title}</a></span>
                    <span className="prob_type">{problem.problem_type}</span>
                    <span className="prob_difficulty"><span className={problem.difficulty === 'easy' ? 'green' : problem.difficulty === 'medium' ? 'yellow' : 'red'}>{problem.difficulty}</span></span>
                    <span className="prob_user">{problem.user}</span>
                    <span className="leaderboard" onClick={() => this.loadLeaderBoard(problem.title)}><span className="lb_text">View Leaderboard</span></span>
                </div>
           );



            return (
              <div id="notNav">
              <Preloader>
                <Placeholder>
                    <span>
                    </span>
                </Placeholder>
              </Preloader>
              {/*
                <table id = "customers">
                    <tbody>
                        <tr id="problemListHeaders">
                            <th>Title</th>
                            <th>Type</th>
                            <th>Difficulty</th>
                            <th>User</th>
                            <th>Leaderboard</th>
                        </tr>
                        {prob_des}
                    </tbody>
                </table>
              */}
              <div id="search">
                <div id="post_problem_div">
                    <button type="button" id="post_problem" className="btn btn-primary btn-lg" onClick={() => this.changeURL('/newProblem')}>Submit a new Problem</button>
                </div>
              </div>
              <div id="problemsList">
                <div id="probHeader">
                    <span id="title_header" className="pt_text">Problem Title</span>
                    <span id="type_header">Type</span>
                    <span id="difficulty_header">Difficulty</span>
                    <span id="user_header">Submitted by</span>
                    <span id="leaderboard_header"><span className="lb_text">Leaderboard</span></span>

                </div>
                <div id="actualProbs">
                    {prob_des}
                </div>
              </div>
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
