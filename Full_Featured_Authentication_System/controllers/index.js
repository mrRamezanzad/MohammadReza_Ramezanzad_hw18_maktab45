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

// Register The User Route
router.post('/register/', (req, res) => {

  userPattern = ["username", "password" ]
  inputKeys = Object.keys(req.body)  

  // Check If All Needed Data Is Passed
  isDataValid = userPattern.every((key) => {
    return inputKeys.includes(key) && req.body[key].trim() !== ""
  })

  if(!isDataValid) return res.status(400).json({msg: "Invalid Data"})

  registerUser(req.body, (err, user) => {
    if (err) return res.status(500).send({msg: "There Was A Problem In Creating The New User"})
    res.send({msg: "Created User Successfully"})
  })

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
