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

const logUserOut = (res) => {
    res.clearCookie('sid')
    res.redirect('/login/')
}

const isLoggedIn = (req, res, next) =>{
    if(req.session.user && req.path.includes("dashboard")) return next()
    if(req.session.user && !req.path.includes("dashboard")) return res.redirect('/dashboard/')
    res.clearCookie()
    if(!req.session.user && req.path.includes("dashboard")) return res.redirect('/login/')
    next()


    
    // return res.redirect("/login/")
}

module.exports = {
    registerUser,
    logUserIn,
    logUserOut,
    isLoggedIn
}