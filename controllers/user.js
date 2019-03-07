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

exports.delete = function() {
    User.remove({}, function(err) { 
    console.log('collection removed') 
 });
}
/*
exports.addFriend = function(req, res) {
    console.log("one");
    User.findOneAndUpdate({ username: req.body.receiver},
        {$push: {'requests': {username: req.body.sender, in_out: false}}},
        {upsert : false, new : true},
        function (err,model) {
            if (err)
                res.send(err);
            else
                res.send('think it worked');
        }
    )
}

exports.addFriend2 = function(req, res) {
    console.log("two");
    User.findOneAndUpdate({ username: req.body.sender},
        {$push: {'requests': {username: req.body.receiver, in_out: true}}},
        {upsert : false, new : true},
        function (err,model) {
            if (err)
                res.send(err);
            else
                res.send('think it worked');
        }
    )
}
*/

exports.addFriend = function(req,res) {
    User.findOne({ username: req.body.receiver })
        .then( name => {
            if (name === null)
                res.status(404).send({message: 'User not found!'});
            else {
                console.log('TESTING:',req.body.receiver, req.body.sender);
                User.findOneAndUpdate({ username : req.body.receiver},
                    {$push: {'requests': {username: req.body.sender, sender: req.body.sender}}},
                    {upsert : false},
                    function (err, user) {
                        if (err)
                            res.send(err);
                    }
                )
                User.findOneAndUpdate({ username : req.body.sender},
                    {$push: {'requests': {username: req.body.receiver, sender: req.body.sender}}},
                    {upsert : false},
                    function (err, user) {
                        if (err)
                            res.send(err);
                    }
                )
                res.status(200).send({message: 'success...'});
            }                
        })
}
/*
exports.getFriends = function(req, res) {
    User.find(function(err,users) {
        if (err)
            res.send(err);
        else
            res.json({
                users
            });
    });
};
*/
exports.getFriendRequests = function(req, res) {
    User.findOne({ username: req.url.substring(req.url.lastIndexOf('/') + 1,req.url.length) })
        .then( user => {
            if (user === null) {
                res.status(404).send({message: 'Something went wrong sorry :('});
            }
            else {
                var friendRequests = user.requests;
                res.json({
                    friendRequests
                })
            }
        })
}


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