const router = require('.')

const express   = require('express'),
      Router    = express.Router(),
      {
        registerUser,
        removeUser, 
        updateUser
      } = require('../services/user')
      
module.exports = router

// ============================Register The User Route============================
router.post('/user/', (req, res) => {
  
  let signupPattern = ["username", "password"]
  let inputKeys = Object.keys(req.body)  
  
  // Check If All The Required Data Is Passed
  let isDataValid =signupPattern.every((key) => {
    return inputKeys.includes(key) && req.body[key]
  })
  
    if(!isDataValid) return res.status(400).render('register', {err: req.flash('error', "Invalid Data")})
    
    registerUser(req.body, (err, user) => {
      
      if (err) return res.status(500).render('register', {err: req.flash('error', "There Was A Problem Registering")})
      
      req.flash('message', "Created User Successfully")
      res.redirect('/login/')
    })
  })
  
  
// ============================Delete Account Route============================
router.delete('/user/:id/', (req, res) => {
  
  const userId = req.params.id
  removeUser(userId, (isDeleted) => {
      if (isDeleted !== true) return res.status(500).json({err: "There Was A Problem Deleting Your Account"})
      res.clearCookie('sid')
      res.status(200).json({msg: "We will Miss You"})
    })
  })
  
// ============================Edit Account Route============================
router.put('/user/:id/', (req, res) => {

  // Sanitize The Updated User Information
  let updatedUserInfo = {
    username: req.body.username
  }
  
  updateUser(req.params.id, updatedUserInfo, (err, newUser) => {
    if (err) return res.status(500).json({err: "There Was A Problem During Update"})
    res.json({msg: "Updated User Successfully"})
  })
})