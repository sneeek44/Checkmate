const express = require('express');
const jwt = require('jsonwebtoken')
const secret = require('../secrets.js')
const router = express.Router();
const database = require('../database');
const {hashValue} = require("../utils/cryptonizing");
const {checkPassword, doesUserExist} = require("../database");

router.get("/", function (_req, res) {
    res.statusCode = 200;
    res.json({
        "message": "api online"
    });
})

router.post('/auth/register', function (req, res) {
    const username = req.body.username
    const password = req.body.password

    const hashedPassword = hashValue(password);
    database.addUser(username, hashedPassword);

    res.statusCode = 200;
    res.json({message: "OK"})
})

router.get('/auth/login', function (req, res) {
    const user = req.body.username
    const password = req.body.password

    checkPassword(user, password).then(r => {
            if (r) {
                const token = jwt.sign({user: user}, secret, {expiresIn: '10m'})
                res.json({token})
            } else {
                res.statusCode = 418
                doesUserExist(user).then(r => {
                    if (r) { //if user exists
                        res.json({"message": "wrong password"})
                    } else {
                        res.json({"message": "no such user"})
                    }
                })
            }
        }
    )
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

router.get('/protected', authenticateToken, (req, res) => {
    // IDK how and why this shit is working, idfc
    console.log(req.user.username)
    res.json({ message: `Hello ${req.user.username}!` });
})

module.exports = router;
