const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const bcrypt = require('bcrypt')
const sql = require('mysql')
const ensureLogin = require('connect-ensure-login')
app.set('views','views')
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
       secret:'Admin@fedora35',
       resave:true,
       saveUninitialized:true
}))
app.use(express.static(path.join(__dirname+'/public')))
app.use(passport.initialize());
app.use(passport.session());
let conn = sql.createConnection({
	host:'localhost',
	user:'root',
	password:'localmux@34',
	database:'passport'
})
conn.connect(err=>{
	if (err) throw err
	console.log('connected')
})
const user = {
  username: 'testuser',
  email: 'dharpranoy2255@gmail.com',
  passwordHash: 'crypto',
  id: 1
}

passport.use(new LocalStrategy(
	{
		usernameField:'email',
		passwordField:'password',
		passReqToCallback:true
	},

	(req,email,password,done)=>{	
		console.log(email,password)
		conn.query(`SELECT * FROM auth WHERE email = '${email}'`,(err,result)=>{
			if (err) return done(err)
			if (result[0]==null) return done(null)
			console.log(result[0])
			bcrypt.compare(password,result[0].password,(error,pass)=>{
				if (error) return done(error)
				if (pass==false) return done(null)
				return done(null,result)
			})
		})
	}	
))
app.get('/login',(req,res)=>{
	res.render('login')
})
app.post('/login/password',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
	res.send('Successfully logged in')
})
app.get('/dashboard',ensureLogin.ensureLoggedIn(),(req,res)=>{
	res.send('secret page')
})
app.listen(5400,()=>{
	console.log('server started at 5400')
})
