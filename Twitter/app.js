const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')()
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcrypt')
const ensureLogin = require('connect-ensure-login')
require('./auth.js')
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
app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
}));
app.get('/dashboard',ensureLogin.ensureLoggedIn(),(req,res)=>{
	console.log(req.user.displayName)
	res.render('secret',{
		name:req.user.displayName
	})
})
app.get('/logout',ensureLogin.ensureLoggedIn(),(req,res)=>{
		req.logout()
		res.redirect('/')
})
app.listen(8080,()=>{
	console.log('server started at 8080')
})
