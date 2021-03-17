var express = require('express'),
    router  = express.Router(),
    {registerUser, logUserOut} = require('../services/authorization')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {msg: req.session.msg, error: req.session.err});
});

// ============================Render Register Page============================
router.get('/register/', (req, res) => {
  res.render('register', {msg: req.session.msg, error: req.session.err})
})

// ============================Register The User Route============================
router.post('/register/', (req, res) => {

  userPattern = ["name","id","age","city","email","username", "password"]
  inputKeys = Object.keys(req.body)  

  // Check If All Needed Data Is Passed
  isDataValid = userPattern.every((key) => {
    return inputKeys.includes(key) && req.body[key]
  })

  if(!isDataValid) return res.status(400).json({msg: "Invalid Data"})

  registerUser(req.body, (err, user) => {
    console.log(err);
    if (err) return res.status(500).send({msg: "There Was A Problem In Creating The New User"})
    req.session.msg = {msg: "Created User Successfully"}
    res.redirect('/login/')
  })

})

// ============================Render Login Page============================
router.get('/login/', (req, res) => {
  res.render('login', {msg: req.session.msg, error: req.session.err})
})

// ============================Logout User============================
router.get('/logout/', (req, res) => {
  logUserOut({})
  res.redirect('/')
})

// ============================Render Dashboard Page============================
router.get('/dashboard/', (req, res) => {
  res.send('this is your dashboard', {msg: req.session.msg, error: req.session.err})
})
module.exports = router;
