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
  res.render('index', {msg: req.flash('message'), err: req.flash('error')});
});

// ============================Render Register Page============================
router.get('/register/', checkLogin, (req, res) => {
  res.render('register', {msg: req.flash('message'), err: req.flash('error')})
})

// ============================Render Login Page============================
router.get('/login/', checkLogin, (req, res) => {
  res.render('login', {msg: req.flash('message'), err: req.flash('error')})
})

// ============================Logging User In============================
router.post('/login/', (req, res) => {
  let loginPattern = ["username", "password"]
  let inputKeys    = Object.keys(req.body)
  let isDataValid = loginPattern.every( input => inputKeys.includes(input) && req.body[input].trim() !== "" )

  if(!isDataValid) {
    req.flash('error', "لطفا فرم ورود را کامل پر کنید")
    return res.redirect('/login/')
  }

  logUserIn(req.body, (err, user) => { 
    if(err){
      req.flash('error', err)
      return res.redirect('/login/')
    }
    req.flash('message', `${user.username} خوش آمدی`) 
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
  res.render('dashboard--profile', {msg: req.flash('message'), err: req.flash('error')})
})


// ============================Render Dashboard Edit Page============================
router.get('/dashboard/edit/', isAuthorized, (req, res) => {
  res.render('dashboard--edit', {msg: req.flash('message'), err: req.flash('error')})
})



module.exports = router;
