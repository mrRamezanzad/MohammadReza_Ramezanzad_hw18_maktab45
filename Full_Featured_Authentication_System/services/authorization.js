const mongoose = require('mongoose'),
      User     = require('../models/user')
      bcrypt   = require('bcrypt')

const registerUser = (userInfo, callback) => {

    new User({
        name    : userInfo.name,
        id      : userInfo.id,
        age     : userInfo.age,
        city    : userInfo.city,
        email   : userInfo.email,
        username: userInfo.username,
        password: userInfo.password,

    }).save(callback)
}

const logUserOut = (userInfo) => {

}

module.exports = {
    registerUser,
    logUserOut
}