const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const nodemailer = require('nodemailer')
const path = require('path')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.json())
let transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "482c279ee23b34",
    pass: "36cbd397dfae89"
  }
})
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/index.html')
})
app.get('/send-mail',(req,res)=>{
	let to = req.query.mail
	let body = req.query.body
	console.log(to,body)
	const mailoptions = {
		from:process.env.from,
		to:`${to}`,
		subject:'Nodemailer',
		text:`${body}`
	}
	transport.sendMail(mailoptions,(err,info)=>{
		if (err) throw err
		console.log(info)
	})
	res.send('ok')
})
app.listen(3400)
