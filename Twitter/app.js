const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')()
const session = require('express-session')
const bcrypt = require('bcrypt')
const ensureLogin = require('connect-ensure-login')
app.set('views','views')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
       secret:'Admin@fedora35',
       resave:true,
       saveUninitialized:true
}))
app.use(express.static(path.join(__dirname,'/public')))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user,done)=>{
	done(null,user)
})
passport.deserializeUser((user,done)=>{
	done(null,user)
})
app.listen(5400,()=>{
	console.log('server started at 5400')
})
