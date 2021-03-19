const User = require('../models/user')
module.exports = {
    registerUser,
    removeUser,
    updateUser
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
    User.updateOne({_id: userId}, updatedUserInfo, (err, updatedUser) => {  
        callback(err, updatedUser)

    })
}