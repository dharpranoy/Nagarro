const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth2').Strategy
const GithubStrategy = require('passport-github2').Strategy
const ensureLogin = require('connect-ensure-login')
const path = require('path')
const Jimp = require('jimp')
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
            let uuid = mail.split('@')[0]
            conn.query(`INSERT INTO users(username,email,uuid) VALUES ('${name}','${mail}','${uuid}')`,(err2,none)=>{
                if (err2) throw err2
			    res.redirect('/dashboard')
            })
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
			res.render('home',{
				'username':req.user.displayName,
				'displaypicture':`${req.user.picture}`
			})
	}
	if (req.user.username!=null){
        let qr = `SELECT dispic from users where email='${req.user.email}'`
        conn.query(qr,(err,result)=>{
            res.render('home',{
                'username':req.user.username,
                'displaypicture':'./uploads/admin.jpg'
		    })
		})
    }
})
router.get('/logout',ensureLogin.ensureLoggedIn(),(req,res)=>{
	req.logout(err=>{
		if (err) throw err
	})	
	res.redirect('/')
})
router.get('/userinfo',(req,res)=>{
	if (req.user.displayName){
		let obj = {
			'username':`${req.user.displayName}`,
			'email':`${req.user.email}`,
			'uuid':`${req.user.email.split('@')[0]}`,
			'dispic':`${req.user.picture}`
		}
		res.send(obj)
	}else{
		let qr = `SELECT * FROM users WHERE email='${req.user.email}'`
		conn.query(qr,(err,result)=>{
			if (err) throw err
			res.send(result[0])
		})
	}
})
router.post('/addtweet',(req,res)=>{
	let uuid = crypto.randomUUID()
	let txt = req.body.txt
	let img = req.body.img
    let path = ""
    if (img!=""){
        const buffer = Buffer.from(img,"base64")
        path = './public/uploads/'+`${uuid}.jpg`
        Jimp.read(buffer, (err,result)=>{
            if (err) {
                path=""
            }else{
                result.quality(0).write(path)
            }
        })
    }
	let name = req.user.username || req.user.displayName
	let qr = `INSERT INTO tweets VALUES("${uuid}","${req.user.email}","${txt}","${path}",CURTIME(),CURDATE(),'${name}')`
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
    let query=""
  	if (req.query.q=="is"){
        query = `INSERT INTO likes VALUES ('${req.query.id}','${req.user.email}')`
    }else{
    		query = `DELETE FROM likes WHERE uid='${req.query.id}' and email='${req.user.email}'`
    }
  	conn.query(query,(err,result)=>{
  		if (err) throw err
  	})
  	res.send('ok')
})
router.get('/chklike',(req,res)=>{
		let qr = `SELECT COUNT(email) as cnt from likes where uid='${req.query.id}'`
		let obj = {
		}
		conn.query(qr,(err,result1)=>{
				obj['cnt']=result1[0].cnt
				let qir = `SELECT email from likes where uid='${req.query.id}' and email='${req.user.email}'`
				conn.query(qir,(err,result2)=>{
					if (result2.length==0) obj['set']=false
					else obj['set']=true
					res.send(obj)
				})
		})
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
    })
    let query = `SELECT * FROM tweets`
    conn.query(query,(err,all)=>{
        res.send(all)
    })
})
router.post('/addcomment',(req,res)=>{
	let name = req.user.username || req.user.displayName
	let qr = `INSERT INTO comments(uuid,email,txt,username) VALUES ('${req.body.id}','${req.user.email}','${req.body.commentmsg}','${name}')`
	conn.query(qr,(err,result)=>{
		if (err) throw err
		let obj = [{
				'txt':`${req.body.commentmsg}`,
				'username':`${name}`
		}]
		res.send(obj)
	})
})
router.get('/checkcomment',(req,res)=>{
		let qr = `SELECT COUNT(email) as count from comments where uuid='${req.query.id}'`
		conn.query(qr,(err,result)=>{
			if (err) throw err
			res.send(result[0])
		})

})
router.get('/comments',(req,res)=>{
		let qr = `SELECT * FROM comments WHERE uuid = '${req.query.id}'`
		console.log(req.query.id)
		conn.query(qr,(err,result)=>{
			if (err) throw err
			console.log(result)
			res.send(result)
		})
})
module.exports = router
