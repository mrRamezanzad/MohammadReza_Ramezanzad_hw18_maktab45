const User      = require('../models/user'),
      bcrypt    = require('bcrypt') 
module.exports = {
    getUserInformation,
    registerUser,
    removeUser,
    updateUser,
    comparePassword,
    updatePassword
}

function getUserInformation(userId, callback) {
    User.findById(userId, (err, user) => {
        if (err) return callback("مشکلی در پیدا کردن اطلاعات کابری بوجود آمده است.", user)
        callback(err, user)
    })
}

function registerUser (userInfo, callback) {
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

function removeUser (userId, callback) {
    User.remove({_id: userId}, (err, result) => {
        if (err) return callback(false)
        callback(true)
    })
}

function updateUser (userId, updatedUserInfo, callback) {
    User.findOneAndUpdate({_id: userId}, {$set: updatedUserInfo}, (err, updatedUser) => {  
        if (err) return callback(err, updatedUser)
        callback(err, updatedUser)
    })
}

function comparePassword (userId, enteredPassword, callback) {
    getUserInformation(userId, (err, user) => {
        if(err) return callback(false)
        bcrypt.compare(enteredPassword, user.password, (err, isMatch) => {
            if(err) return callback(err, isMatch)
            callback(err, isMatch)
        })
    })
}

function updatePassword (userId, newPassword, callback) {
    User.findById({_id: userId},function (err, user) {
        if (err) return callback(err, false)
        user.password = newPassword
        user.save()
        callback(err, true)
    })

}