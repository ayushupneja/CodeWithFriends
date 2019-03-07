var express = require('express');
var enableWs = require('express-ws');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var problemController = require('./controllers/problems');
var submissionController = require('./controllers/submissions');

mongoose.connect('mongodb://localhost:27017/code_together', {useNewUrlParser : true, useFindAndModify: false, useCreateIndex: true});

// Create our Express application
var app = express();
enableWs(app);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded( {
    extended: true
}));

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(cors());

// Create our Express router
var router = express.Router();

router.route('/signup')
    .post(userController.postUsers)

router.route('/login')
    .post(authController.isAuthenticated, userController.postLogin)

router.route('/logout')
    .delete(userController.logout)

/*
router.route('/test')
    .get(userController.delete)
*/

router.route('/problems')
    .post(problemController.postProblem)
    .get(problemController.getProblems)

router.route('/submissions')
    .post(submissionController.test)

router.route('/addFriend')
    .post(userController.addFriend)
    //.post(userController.addFriend, userController.addFriend2)
    //.get(userController.getFriends)

router.route('/friendRequests*')
    .get(userController.getFriendRequests)

// Later will have to make this collections of users that are connected
// For now we can just have one list
var connections = [];

router.ws('/echo*', (ws, req) => {
    console.log(req.url);
    console.log(req.url.substring(6,req.url.lastIndexOf('/'))); //pull out username from request url
    ws.username = req.url.substring(6,req.url.lastIndexOf('/'));
    connections.push(ws);
    console.log(connections);

    /*
    ws.on('message', msg => {
        console.log(msg);
        ws.send(msg);
    });
    */

    ws.on('message', msg => {
        connections.forEach( (connection) => {
            connection.send(msg);
        })
    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
    })
})



app.use('',router);

/*
const express = require('express')
const enableWs = require('express-ws')

const app = express()
enableWs(app)

app.ws('/echo', (ws, req) => {
    ws.on('message', msg => {
        ws.send(msg)
    })

    ws.on('close', () => {
        console.log('WebSocket was closed')
    })
})

app.listen(80)
*/

/*
var router = express.Router();
 
router.ws('/echo', function(ws, req) {
  ws.on('message', function(msg) {
    ws.send(msg);
  });
});
 
app.use("/ws-stuff", router);
*/



app.listen(5000);