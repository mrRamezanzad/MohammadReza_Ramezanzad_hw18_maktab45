const cookieParser  = require('cookie-parser'),
      session       = require('express-session'),
      createError   = require('http-errors'),
      mongoose      = require('mongoose'),
      express       = require('express'),
      app           = express(),
      path          = require('path'),
      logger        = require('morgan')

// Importing Contorllers
const indexRouter   = require('./controllers/index')

// Connect To DataBase And Show Proper Messages
let db = mongoose.connect("mongodb://localhost:27017/hw18",{
  newIndex            : true,
  useNewUrlParser     : true,
  useUnifiedTopology  : true,
}, (err) => {
  if (err) return console.log(err)
  console.log("================================ Successfully Connected To DataBase ================================")
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Setting Session Up
app.use(session({
  secret: "Go Fuck Yourself",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 600000
  }
}))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// Set Up Controllers To Handle Routes
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
