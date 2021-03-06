const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt')

const commonSchemaFields = {
    type        : String,
    trim        : true,
    lowercase   : true,
    // minlength   : 1,
    // maxlength   : 24
}

const userSchema = new mongoose.Schema({
    
    // name: {
    //     type: String
    // },
    // id: {
    //     ...commonSchemaFields,
    //     required    : true,
    //     // unique      : true,
    //     // validate    : (value) =>{
    //     //     if (value.length !== 10) throw new Error("The Id Must Be 10 Digits")
    //     // }
    // },
    // city: {
    //     type: String
    // },
    // age: {
    //     ...commonSchemaFields,
    //     // validate: (value) => {
    //     //     if (value<0 || value> 150)  throw new Error ("The Age Must Be Greater Than 0 And Less Than 150")
    //     // }
    // },
    // email: {
    //     ...commonSchemaFields,
    //     required  : true,
    //     // unique    : true,
    //     // // validate  : (value) =>{
    //     // //     let emailPattern = /.*@.*/
    //     // //     if (!emailPattern.test(value)) throw new Error ("Enter A Valid Email")
    //     // // }
    // },
    username: {
        ...commonSchemaFields,
        required  : true,
        unique    : true,
       
    },
    password: {
        type      : String,
        trim      : true,
        required  : true,
        
    },

})
// ==========================Pre Save Hook==========================
userSchema.pre("save", function (next) {
    user = this
    
    // Encrypt Password And Save It To DataBase
    bcrypt.hash(user.password, 12, (err, hash) => {
        if(err) return next(new Error("there was a problem with password"))
        user.password = hash
        next()
        
    })
})

const User = mongoose.model("User", userSchema)
module.exports = User