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

let lo = {
    score: 1000,
    user: 'quinnyyy'
}

let lb = [lo,lo,lo,lo,lo,lo,lo,lo,lo,lo]

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
    },
    test_case_datastructure: {
        type: String,
        default: 'array'
    },
    function_definition: {
        type: String,
        default: ''
    },
    leader_board: {
        type: [{
            score: Number,
            user: String
        }],
        default: lb
    }
})

module.exports = mongoose.model('Problem', ProblemSchema);