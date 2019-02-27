var mongoose = require('mongoose');

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

module.exports = mongoose.model('Problem', ProblemSchema);