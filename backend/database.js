const mongoose = require('mongoose')
const userModel = require('./models/user')
const uri = 'mongodb://localhost:27017/userdb'
const crypto = require('./utils/cryptonizing')

function connect() {
    mongoose.connect(uri).then(() => console.log('Connected to the database')).catch(err => console.log(err))
}

function addUser(username, password) {
    const newUser = new userModel({
        username: username,
        password: password
    });

    newUser.save()
        .then(user => console.log(user))
        .catch(err => console.error(err));
}

async function doesUserExist(username) {
    const user = await userModel.findOne({'username': username})
    return user != null;
}

async function checkPassword(username, password) {
    const user = await userModel.findOne({'username': username}, 'password', null)
    if (user == null) {
        return false
    }
    const pwd = user.password
    if (password == null) {
        return false
    }

    return crypto.compare(password, pwd)
}

module.exports = {
    connect,
    addUser,
    checkPassword,
    doesUserExist
}