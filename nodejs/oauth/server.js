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
app.use(express.static(path.join(__dirname,'/public')))
app.use(passport.initialize());
app.use(passport.session());
let conn = sql.createConnection({
	host:'localhost',
	user:'root',
	password:'mysql#pypi',
	database:'passport'
})
conn.connect(err=>{
	if (err) throw err
	console.log('connected')
})
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
				return done(null,result[0])
			})
		})
	}	
))
passport.serializeUser((user,done)=>{
	done(null,user.email)
})
passport.deserializeUser((user,done)=>{
	return done(null,user)
})
app.get('/',(req,res)=>{
	res.redirect('/login')
})
app.get('/login',(req,res)=>{
	res.render('login')
})
app.post('/login/password',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
	res.render('logout')
})
app.post('/login/register',(req,res)=>{
	let name = req.body.username
	let mail = req.body.email
	let password = req.body.password
	bcrypt.hash(password,10)
	.then(hashed=>{
		conn.query(`INSERT INTO auth VALUES ('${name}','${hashed}','${mail}')`,(err,result)=>{
			if (err) throw err
			res.redirect('/login/password')
		})
	})

})
app.get('/dashboard',ensureLogin.ensureLoggedIn(),(req,res)=>{
	console.log(req.user)
	res.render('secret',{
		name:req.user
	})
})
app.get('/logout',ensureLogin.ensureLoggedIn(),(req,res)=>{
		req.logout()
		res.redirect('/')
})
app.listen(5400,()=>{
	console.log('server started at 5400')
})
