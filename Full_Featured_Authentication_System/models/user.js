const mongoose = require('mongoose'),
      bcrypt   = require('bcrypt')

const commonSchemaFields = {
    type        : String,
    trim        : true,
    required    : true,
    minlength   : 3,
    maxlength   : 24
}

const userSchema = new mongoose.Schema({
    username: {
        ...commonSchemaFields
    },
    password: {
        ...commonSchemaFields
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User