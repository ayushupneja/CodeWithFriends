var User = require('../models/user');
var UserSession = require('../models/UserSession');

// Create endpoint /signup for POST
exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findOne({ username: user.username })
        .then (taken_name => {
            if (taken_name) {
                res.status(409).send({message: 'User already exists!'});
            } else {
                user.save();
                res.json();
            }
        })
};

// Create endpoint /signup for GET

exports.getSessions = function(req, res) {
    UserSession.find(function(err, sessions) {
        if (err)
            res.send(err);
        else
            res.json({
                sessions
            });
    });
};



exports.logout = function(req, res) {
    UserSession.deleteMany({ username: req.body.username }, function(err, session) {
        if (err)
            res.send(err);
        else
            res.json({
                session
            })
    });
}

exports.postLogin = function(req, res) {
    // Need to figure out how to error check here... maybe... probabl
    const username = req.body.username;
    console.log(req.body);

    User.findOne({ username }).then(user => {
        if (!user) {
            console.log(username);
            return res.status(404).json({ usernamenotfound: "Username not found" });
        }

        var session = new UserSession({
            username: username,
            timestampe: Date.now(),
            isDeleted: false  
        });

        session.save(function(err) {
            if (err)
                res.send(err);
            else {
                res.json({session});
            }
        });
    });
};