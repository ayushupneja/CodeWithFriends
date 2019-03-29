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

// Create endpoint /problems for GET
// Let's change it later to get only one problem or only x problems
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