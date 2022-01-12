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
            result=result.rows
            let uuid = mail.split('@')[0]
            conn.query(`INSERT INTO users(username,email,pid) VALUES ('${name}','${mail}','${uuid}')`,(err2,none)=>{
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
            let pid = req.user.email.split('@')[0]
            let qr = `INSERT INTO users SELECT '${req.user.displayName}','${req.user.email}','${pid}','${req.user.picture}' where not exists (SELECT * FROM users WHERE email = '${req.user.email}')`
            conn.query(qr,(err,result)=>{
                result=result.rows
                res.render('home',{
                    'username':req.user.displayName,
                    'displaypicture':`${req.user.picture}`
			    })

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
router.get('/userinfo',ensureLogin.ensureLoggedIn(),(req,res)=>{
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
            result=result.rows
			res.send(result[0])
		})
	}
})
router.post('/addtweet',ensureLogin.ensureLoggedIn(),(req,res)=>{
	let uuid = crypto.randomUUID()
	let txt = req.body.txt
	let img = req.body.img
    let path = '' 
    if (img!=''){
        const buffer = Buffer.from(img,"base64")
        path = './public/uploads/'+`${uuid}.jpg`
        Jimp.read(buffer, (err,result)=>{
            if (err) {
                path=''
            }else{
                result.quality(0).write(path)
            }
        })
    }
	let name = req.user.username || req.user.displayName
	let qr = `INSERT INTO tweets values ('${uuid}','${req.user.email}','${txt}','${path}',CURRENT_TIME,CURRENT_DATE,'${name}');`
	console.log(qr)
    conn.query(qr,(err,result1)=>{
        let sel = `SELECT uid,t1.email,txt,img,post,dates,t1.username,dispic FROM tweets t1 inner join users u1 on t1.email = u1.email and uid = '${uuid}'`
        conn.query(sel,(err2,result)=>{
            res.send(result.rows)
        })
    })
})
router.get('/like',ensureLogin.ensureLoggedIn(),(req,res)=>{
    let query=""
  	if (req.query.q=="is"){
        query = `INSERT INTO likes VALUES ('${req.query.id}','${req.user.email}')`
    }else{
    		query = `DELETE FROM likes WHERE uid='${req.query.id}' and email='${req.user.email}'`
    }
  	conn.query(query,(err,result)=>{
        console.log(err)
  	})
  	res.send('ok')
})
router.get('/chklike',ensureLogin.ensureLoggedIn(),(req,res)=>{
		let qr = `SELECT COUNT(email) as cnt from likes where uid='${req.query.id}'`
		let obj = {
		}
		conn.query(qr,(err,result1)=>{
                result1=result1.rows
				obj['cnt']=result1[0].cnt
				let qir = `SELECT email from likes where uid='${req.query.id}' and email='${req.user.email}'`
				conn.query(qir,(err,result2)=>{
                    result2=result2.rows
					if (result2.length==0) obj['set']=false
					else obj['set']=true
					res.send(obj)
				})
		})
})
router.get('/profview',ensureLogin.ensureLoggedIn(),(req,res)=>{
    console.log(req.query)
    res.send('ok')
})
router.get('/recent',ensureLogin.ensureLoggedIn(),(req,res)=>{
    let mail = req.query.mail
    let query = `SELECT uid,t1.email,txt,img,post,dates,t1.username,dispic FROM tweets t1 inner join users u1 on t1.email = u1.email`
    conn.query(query,(err,all)=>{
        all=all.rows
        res.send(all)
    })
})
router.post('/addcomment',ensureLogin.ensureLoggedIn(),(req,res)=>{
	let name = req.user.username || req.user.displayName
	let qr = `INSERT INTO comments(uuid,email,txt) VALUES ('${req.body.id}','${req.user.email}','${req.body.commentmsg}')`
	conn.query(qr,(err1,result)=>{
            let lr=`SELECT dispic from users where email = '${req.user.email}'`
            conn.query(lr,(err2,pic_url)=>{
                if (err2) console.log(err2)
                pic_url=pic_url.rows
                let obj = [{
                    'username':`${name}`,
                    'email':`${req.user.email}`,
                    'dispic':`${pic_url[0].dispic}`,
                    'txt':`${req.body.commentmsg}`
                }]
                res.send(obj)
            })

        })
})
router.get('/checkcomment',ensureLogin.ensureLoggedIn(),(req,res)=>{
		let qr = `SELECT COUNT(email) as count from comments where uuid='${req.query.id}'`
		conn.query(qr,(err,result)=>{
            result=result.rows
			res.send(result[0])
		})

})
router.get('/comments',ensureLogin.ensureLoggedIn(),(req,res)=>{
		let qr = `SELECT * FROM comments c1 join users u1 ON c1.email = u1.email AND c1.uuid = '${req.query.id}'`
		conn.query(qr,(err,result)=>{
            result=result.rows
			res.send(result)
		})
})
module.exports = router
