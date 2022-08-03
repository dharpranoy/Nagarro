const express = require('express')
const app = express()
const secretkey = 'sk_test_51LSa6VSE7l0ULveF2DtBU7S3A7XjwnJQQC1Eu8VHrIodwSoAzDomunQdlnLALI1i738L7iEKW7wPVY09iobuqMcK00hiPyDj29' 
const stripe = require('stripe')(secretkey)
const bodyparser = require('body-parser')
const path = require('path')
const ejs = require('ejs')
app.set('views','./views')
app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'./public')))
app.post('/charge',(req,res)=>{
	try{
		stripe.customers
		.create({
			name:req.body.name,
			email:req.body.email,
			source:req.body.stripeToken
		})
		.then((customer)=>{
			stripe.charges.create({
				amount:req.body.amount,
				currency:'INR',
				customer:customer.id
			})
		})
		.then(()=>res.sendFile(__dirname+'/public/completed.html'))
	}catch(err){
		res.send('Some error occured')
	}
})
const port = process.env.PORT || 3600
app.listen(port)
