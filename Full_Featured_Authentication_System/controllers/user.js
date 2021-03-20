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
  
    if(!isDataValid) {
      req.flash('error', "مقادیر ورودی را چک کنید")
      return res.status(400).redirect('register')
    }

    registerUser(req.body, (err, user) => {
      if (err) {
        req.flash('error', "مشکلی در ثبت نام شما وجود دارد")
        return res.status(500).redirect('/register/')
      }
      
      req.flash('message', "اکانت شما با موفقیت ساخته شد")
      res.redirect('/login/')
    })
  })
  
  
// ============================Delete Account Route============================
router.delete('/user/:id/', (req, res) => {
  
  const userId = req.params.id
  removeUser(userId, (isDeleted) => {
      if (isDeleted !== true) return res.status(500).json({err: "در این لحظه امکان حذف اکانت وجود ندارد"})
      res.clearCookie('sid')
      res.status(200).json({msg: "به امید دیدار"})  
    })
  })
  
// ============================Edit Account Route============================
router.put('/user/:id/', (req, res) => {

  // Sanitize The Updated User Information
  let updatedUserInfo = {
    username: req.body.username
  }
  
  updateUser(req.params.id, updatedUserInfo, (err, newUser) => {
    if (err) return res.status(500).json({err: "تغییرات نا موفق بود"})
    res.json({msg: "اکانت شما با موفقیت آپدیت شد"})
  })
})