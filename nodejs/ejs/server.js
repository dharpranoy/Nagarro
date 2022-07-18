const express = require('express')
const app = express()
app.set('views','./views')
app.set('view engine','ejs')
app.get('/',(req,res)=>{
	let details={
		'Name':'Pranoy Dhar',
		'Email':'dharpranoy2255@gmail.com',
		'Github':'github.com/dharpranoy/Nagarro'
	}
	let quote='Ejs is fun with Nodejs'
	res.render('index',{
		details:details,
		logg:quote
	})
})
app.listen(3300)
