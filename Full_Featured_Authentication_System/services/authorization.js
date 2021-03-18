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
    
    console.log("im hereeee", userInfo);
    User.findOne({username: userInfo.username}, (err, user) => {
        if(err) return callback(err, user)
        if(!user) return callback({msg: "no user found"}, user)
        
        bcrypt.compare(userInfo.password, user.password, (err, isMatch) => {
            
            if(err) return callback({msg: "password doesn't match"}, user)
            if(!isMatch) return callback({msg:"wrong password"}, user)
            callback(err, user)

        })
    })
}

const logUserOut = (req, res) => {
    res.clearCookie('sid')
    res.redirect('/login/')
}

const isLoggedIn = (req, res, next) =>{
    if(req.session.user && req.cookies.sid) return res.redirect("/dashboard/")
    next()
}
const isAuthorized = (req, res, next) =>{
    if(req.session.user && req.cookies.sid) return next()
    res.redirect("/login/")
}

module.exports = {
    registerUser,
    logUserIn,
    logUserOut,
    isAuthorized,
    isLoggedIn
}