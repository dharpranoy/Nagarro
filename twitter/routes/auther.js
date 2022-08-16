const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const GithubStrategy = require('passport-github2').Strategy
const ensureLogin = require('connect-ensure-login')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')
let axios = require('axios')
let conn = require('./cred')
router.get('/login',(req,res)=>{
	res.render('login')
})
router.post('/login/password',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
	res.redirect('/dashboard')
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
	if (req.user.displayName!=null){
		axios.get(`${req.user.picture}`)
		.then(res=>res.data)
		.then(data=>{
			res.render('home',{
				'username':req.user.displayName,
				'displaypicture':data
			})
		})
	}
	if (req.user.username!=null){
		res.render('home',{
			'username':req.user.username,
			'displaypicture':'./src/x.jpg'
		})
	}
})
router.get('/logout',ensureLogin.ensureLoggedIn(),(req,res)=>{
	req.logout(err=>{
		if (err) throw err
	})	
	res.redirect('/')
})
router.post('/addtweet',(req,res)=>{
	let uuid = crypto.randomUUID()
	let txt = req.body.txt
	let img = ""
	let name = req.user.username || req.user.displayName
	let qr = `INSERT INTO tweets VALUES("${uuid}","${req.user.email}","${txt}","",CURTIME(),CURDATE(),'${name}')`
	conn.query(qr,(err,result)=>{
		if (err) throw err
	})
	let sel = `SELECT * FROM tweets WHERE uid='${uuid}'`
	conn.query(sel,(err,result)=>{
		if (err) throw err
		res.send(result)
	})
})
router.get('/like',(req,res)=>{
    if (req.query.q=="is"){
        let query = `INSERT INTO likes VALUES ('${req.query.id}','${req.user.email}')`
        res.send('ok')
    }
})
router.get('/profview',(req,res)=>{
    console.log(req.query)
    res.send('ok')
})
router.get('/recent',(req,res)=>{
    let mail = req.query.mail
    let select = `SELECT users FROM followers WHERE current='${mail}'`
    conn.query(select,(err,fw)=>{
        if (err) throw err
        let str = ""
        for (f of fw){
            str+="'"+f.users+"'"+","
        }
        str=str.substring(-1)
        console.log(str)
    })
    let query = `SELECT * FROM tweets`
    conn.query(query,(err,all)=>{
        res.send(all)
    })
})
module.exports = router
