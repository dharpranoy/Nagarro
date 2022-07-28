const router = require('express').router()
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
			res.redirect('/login/password')
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
        failureRedirect: '/login'
}));
router.get('/dashboard',ensureLogin.ensureLoggedIn(),(req,res)=>{
	console.log(req.user)
	res.render('secret',{
		name:req.user
	})
})
router.get('/logout',ensureLogin.ensureLoggedIn(),(req,res)=>{
		req.logout()
		res.redirect('/')
})
