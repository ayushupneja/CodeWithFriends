var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');
var problemController = require('./controllers/problems')

mongoose.connect('mongodb://localhost:27017/code_together', {useNewUrlParser : true, useFindAndModify: false, useCreateIndex: true});

// Create our Express application
var app = express();

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
    //.get(authController.isAuthenticated, userController.getUsers);
    //.get(authController.isAuthenticated, userController.getUsers);

router.route('/login')
    .post(authController.isAuthenticated, userController.postLogin)

router.route('/logout')
    .delete(userController.logout)

router.route('/test')
    .get(userController.getSessions)

router.route('/problems')
    .post(problemController.postProblem)
    .get(problemController.getProblems)

app.use('',router);

app.listen(5000);