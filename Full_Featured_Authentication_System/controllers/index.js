var express = require('express'),
    router  = express.Router(),
    {registerUser, logUserOut} = require('../services/authorization')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Render Register Page
router.get('/register/', (req, res) => {
  res.render('register')
})

router.post('/register/', (req, res) => {
  registerUser({})
})

// Render Login Page
router.get('/login/', (req, res) => {
  res.render('login')
})

// Logout User
router.get('/logout/', (req, res) => {
  logUserOut({})
  res.redirect('/')
})

// Render Dashboard Page
router.get('/dashboard/', (req, res) => {
  res.send('this is your dashboard')
})
module.exports = router;
