const mongoose = require('mongoose'),
      User     = require('../models/user')
      bcrypt   = require('bcrypt')

const registerUser = (userInfo, callback) => {
    new User({
        // name    : userInfo.name,
        // id      : userInfo.id,
        // age     : userInfo.age,
        // city    : userInfo.city,
        // email   : userInfo.email,
        username: userInfo.username,
        password: userInfo.password,

    }).save(callback)
}

const logUserIn = (userInfo, callback) => {
    
    User.findOne({username: userInfo.username}, (err, user) => {
        if(err) return callback(err, user)
        if(!user) return callback(err, user)
        if(user.password === userInfo.password) return callback(err, user)
        
    })
}

const logUserOut = (userInfo) => {

}

module.exports = {
    registerUser,
    logUserIn,
    logUserOut
}