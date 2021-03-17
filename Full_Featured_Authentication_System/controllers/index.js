const express = require('express'),
    router  = express.Router(),
    {registerUser, logUserIn, logUserOut, isLoggedIn} = require('../services/authorization')

// ============================Render Home Page============================
router.get('/', function(req, res, next) {
  res.render('index', {msg: req.session.msg, err: req.session.err});
});

// ============================Render Register Page============================
router.get('/register/', isLoggedIn, (req, res) => {
  res.render('register', {msg: req.session.msg, err: req.session.err})
})

// ============================Register The User Route============================
router.post('/register/', (req, res) => {

  let signupPattern = ["username", "password"]
  let inputKeys = Object.keys(req.body)  

  // Check If All The Required Data Is Passed
  let isDataValid =signupPattern.every((key) => {
    return inputKeys.includes(key) && req.body[key]
  })

  if(!isDataValid) return res.status(400).json({msg: "Invalid Data"})

  registerUser(req.body, (err, user) => {
    if (err) return res.status(500).send({msg: "There Was A Problem In Creating The New User"})
    // req.session.msg = {msg: "Created User Successfully"}
    res.redirect('/login/')
    // req.session.msg = {msg: undefined}
  })

})

// ============================Render Login Page============================
router.get('/login/', isLoggedIn, (req, res) => {
  res.render('login', {msg: req.session.msg, err: req.session.err})
})

// ============================Render Login Page============================
router.post('/login/', (req, res) => {
  let loginPattern = ["username", "password"]
  let inputKeys    = Object.keys(req.body)
  let isDataValid = loginPattern.every( input => inputKeys.includes(input) && req.body[input].trim() !== "" )

  if(!isDataValid) {
    req.session.err = "Login Inputs Can't Be Empty"
    return res.redirect('/login/')
  }

  logUserIn(req.body, (err, user) => {
    if(err){
      req.session.err = err
      return res.redirect('/login/')
    }
    req.session.msg  = `Wellcome Back ${user.username}`
    req.session.user = user

    return res.redirect('/dashboard/')
  })

})
// ============================Logout User============================
router.get('/logout/', (req, res) => {
  logUserOut(res)
})

// ============================Render Dashboard Page============================
router.get('/dashboard/', isLoggedIn, (req, res) => {
  res.render('dashboard', {msg: req.session.msg, err: req.session}, (err, page) => {
    req.session.msg =""
    req.session.err =""
    res.send(page)
  })
})

module.exports = router;
