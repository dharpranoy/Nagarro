const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const GithubStrategy = require('passport-github2').Strategy
const { Pool } = require('pg')
require('dotenv').config()
const pool = new Pool({
     connectionString: 'postgres://dxplkrbuuynpdo:f95f2050bb3a5c42b32664dc3d2e530f6362a1100e9201efe1b404477f8912cb@ec2-54-86-106-48.compute-1.amazonaws.com:5432/d4liidlm4blda3',
    ssl:{
         rejectUnauthorized: false
    }
})
passport.use(new LocalStrategy(
	{
		usernameField:'email',
		passwordField:'password',
		passReqToCallback:true
	},

	(req,email,password,done)=>{	
		console.log(email,password)
		pool.query(`SELECT * FROM auth WHERE email = '${email}'`,(err,result)=>{
			if (err) return done(err)
            result=result.rows
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
		callbackURL: 'https://twit43.herokuapp.com/auth/google/callback',
		passReqToCallback: true,
		scope : ['profile','email']
	},
	(req,accessToken,refreshToken,profile,done)=>{
		return done(null,profile)
	}
))
module.exports = pool
