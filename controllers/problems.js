var Problem = require('../models/problem');

// Create endpoint /problems for POST
exports.postProblem = function(req, res) {
    var prob = new Problem({
        title: req.body.title,
        timestamp: Date.now(),
        problem_type: req.body.problem_type,
        difficulty: req.body.difficulty,
        user: req.body.username,
        description: req.body.description,
        test_cases: req.body.test_cases
    });

    prob.save();
    res.json({
        message: 'Problem saved!'
    });
}

exports.getProblem = function(req, res) {
    console.log(req.body.title);
    let title = req.body.title.replace(/\+/g,' ');
    console.log(title)
    Problem.find({ title: title})
        .then ( problem => {
            console.log(problem)
            if (problem) {
                res.json(problem)
            } else {
                res.status(400).send({message: 'Problem not found'})
            }
        }
        )
}

exports.getProblems = function(req, res) {
    Problem.find(function(err, problems) {
        if (err)
            res.send(err);
        else
            res.json({
                problems
            });
    });
};

exports.delete = function() {
    Problem.remove({}, function(err) {
        console.log('problems deleted')
    });
}