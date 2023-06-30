const express = require('express');
const app = express();
//const cookieSession = require("cookie-session");
//var router = express.Router();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
var routes = require('./routes');
//console.log(routes)
const cors = require('cors');
//var jwt = require('jsonwebtoken')
app.use(cors({
        origin: "http://localhost:4200",
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
    }

));

mongoose.connect("mongodb://127.0.0.1:27017/Reliance", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected Successfully'))
    .catch((err) => { console.error(err); });
/*
var passport = require('passport')
var session = require('express-session')
*/

//app.use(express.json());

//app.use(express.urlencoded({ extended: true }));
/*
require('./passport-config')
app.use(passport.session())
app.use(passport.initialize())

//GET Methods


//POST Methods
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new user(userData)
    user.save((err, registeredUser) => {
        if (err) {
            console.log(err)
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secret_key')
            res.status(200).send({ token })
        }
    })
})

router.post('/user/login_token', (req, res, next) => {
    console.log("Inside Passport JS")
    passport.authenticate('local', function(err, user, info) {
        if (err) { return res.status(401).json(err); }
        if (!user) { return res.status(401).json(info); }
        req.logIn(user, function(err) {
            if (err) { return res.status(501).json(err); }
            return res.status(200).json({ message: 'Login Success' });
        });
    })(req, res, next);
})

//GET Methods
router.get('/content', isValidUser, function(req, res, next) {
    return res.status(200).json(req.user);
});


function isValidUser(req, res, next) {
    if (req.isAuthenticated()) next();
    else return res.status(401).json({ message: 'Unauthorized Request' });
}
*/

app.listen(8086, function port(error) {
    if (error) {
        console.log(error)
    } else {
        console.log("Port  Connected 8086")
    }
});

//const cors = require("cors");

//app.use(cors(corsOptions)) // Use this after the variable declaration
//Code for generating JWT ==>
/*function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}*/
// Passport JWT

//*/
app.use(express.json());
app.use(routes);
app.use(express.urlencoded({ extended: true }));

//module.exports(app)