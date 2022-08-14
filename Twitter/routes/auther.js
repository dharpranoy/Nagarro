const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const GithubStrategy = require('passport-github2').Strategy
const ensureLogin = require('connect-ensure-login')
let conn = require('./cred')
router.get('/login',(req,res)=>{
	res.render('login')
})
router.post('/login/password',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
	res.render('logout')
})
router.post('/login/register',(req,res)=>{
	let name = req.body.username
	let mail = req.body.email
	let password = req.body.password
	bcrypt.hash(password,10)
	.then(hashed=>{
		conn.query(`INSERT INTO auth VALUES ('${name}','${hashed}','${mail}')`,(err,result)=>{
			if (err) throw err
			res.redirect('/dashboard')
		})
	})

})
router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/'
}));
router.get('/dashboard',ensureLogin.ensureLoggedIn(),(req,res)=>{
	console.log(req.user.displayName)
	res.render('home',{
		'username':req.user.displayName
	})
})
router.get('/logout',ensureLogin.ensureLoggedIn(),(req,res)=>{
		req.logout((err)=>{
		})
		res.redirect('/')
})
module.exports = router
