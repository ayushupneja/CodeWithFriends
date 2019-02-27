var Problem = require('../models/problem');

// Create endpoint /problems for POST
exports.postProblem = function(req, res) {
    var prob = new Problem({
        description: req.body.description,
        timestamp: Date.now(),
        user: req.body.username
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

