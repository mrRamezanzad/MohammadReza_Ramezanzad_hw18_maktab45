const mongoose = require('mongoose'),
      User     = require('../models/user')
      bcrypt   = require('bcrypt')

const registerUser = (userInfo, callback) => {

    new User({
        username: userInfo.username,
        password: userInfo.password
    }).save(callback)
}

const logUserOut = (userInfo) => {

}

module.exports = {
    registerUser,
    logUserOut
}