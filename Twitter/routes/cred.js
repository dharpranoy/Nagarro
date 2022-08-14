const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const GithubStrategy = require('passport-github2').Strategy
const sql = require('mysql')
require('dotenv').config()
let conn = sql.createConnection({
	host:'localhost',
	user:'root',
	password:process.env.PSSWD2,
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
passport.use(new GoogleStrategy({
		clientID: '32532849948-3hkscs2ljkdnh09h13rdobt1cchpqk2j.apps.googleusercontent.com',
		clientSecret: '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',
		callbackURL: 'http://localhost:8080/auth/google/callback',
		passReqToCallback: true,
		scope : ['profile','email']
	},
	(req,accessToken,refreshToken,profile,done)=>{
		return done(null,profile)
	}
))
module.exports = conn
