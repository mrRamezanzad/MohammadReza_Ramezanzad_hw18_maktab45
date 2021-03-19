const { render } = require('ejs');

const express = require('express'),
      router  = express.Router(),
      {
        logUserIn,
        logUserOut,
        isAuthorized,
        checkLogin
      } = require('../services/authorization'),
      {
        registerUser,
      } = require('../services/user')

// ============================Render Home Page============================
router.get('/', function(req, res, next) {
  res.render('index', {msg: req.session.msg, err: req.session.err});
});

// ============================Render Register Page============================
router.get('/register/', checkLogin, (req, res) => {
  res.render('register', {msg: req.session.msg, err: req.session.err})
})

// ============================Render Login Page============================
router.get('/login/', checkLogin, (req, res) => {
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
  logUserOut(req, res)
})

// ============================Render Dashboard Page============================
router.get('/dashboard/', isAuthorized, (req, res) => {
  res.render('dashboard--profile', {msg: req.session.msg, err: req.session}, (err, page) => {
    flush(req, res, page)
  })
})


// ============================Render Dashboard Edit Page============================
router.get('/dashboard/edit/', isAuthorized, (req, res) => {
  res.render('dashboard--edit', {msg: req.session.msg, err: req.session}, (err, page) => {
    flush(req, res, page)
  })
})

// Clear The Flash Messages
function flush(req, res, page) {
  req.session.msg =""
  req.session.err =""
  res.send(page)
}

module.exports = router;
