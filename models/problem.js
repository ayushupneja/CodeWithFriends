var mongoose = require('mongoose');
/*
var ProblemSchema = new mongoose.Schema({
    description: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: String,
        default: ''
    }
});
*/

var ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    problem_type: {
        type: String,
        default: 'golf'
    },
    difficulty: {
        type: String,
        default: 'medium'
    },
    user: {
        type: String,
        default: 'quinnyyy'
    },
    description: {
        type: String,
        default: ''
    },
    tests_cases: {
        type: [{
            case: String,
            answer: String
        }],
        default: []
    }
})

module.exports = mongoose.model('Problem', ProblemSchema);