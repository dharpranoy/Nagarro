import { conn } from './db.js'
if (conn) console.log('Connected')
import passport from 'passport'
import LocalStrategy from 'passport-local'
import bcrypt from 'bcrypt'
passport.use(new LocalStrategy(
	{
		usernameField:'mail',
		passwordField:'passwd',
		passReqToCallback:true
	},

	(req,email,password,done)=>{	
		conn.query(`SELECT * FROM auth WHERE email = '${email}'`,(err,result)=>{
			if (err) return done(err)
            result=result.rows
			if (result.length==0) return done(null)
			bcrypt.compare(password,result[0].password,(error,pass)=>{
				if (error) return done(error)
				if (pass==false) return done(null)
				return done(null,result[0])
			})
		})
	}	
))
passport.serializeUser((user,done)=>{
	done(null,user)
})
passport.deserializeUser((user,done)=>{
	return done(null,user)
})

import express from 'express'
import crypto from 'crypto'
const router = express.Router()
router.get('/',(req,res)=>{
    res.redirect('/login')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/login/password',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
    res.redirect('/home')
})
router.post('/sign_up',(req,res)=>{
    let pid = crypto.randomUUID() 
    bcrypt.hash(req.body.passwd,10)
    .then(passwd=>{
        conn.query(`INSERT INTO auth VALUES ('${req.body.uname}','${req.body.mail}','${passwd}','${pid}')`,(err,result)=>{
            if (err) console.log(err)
            res.redirect('/home')
        })
            
    })
})
router.get('/logout',(req,res)=>{
    req.logout((err)=>{
        if (err) throw err
        res.redirect('/')
    })
})
export { router }
