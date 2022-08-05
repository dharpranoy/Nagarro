const express = require('express')
const app = express()
const secretkey = 'sk_test_51LSa6VSE7l0ULveF2DtBU7S3A7XjwnJQQC1Eu8VHrIodwSoAzDomunQdlnLALI1i738L7iEKW7wPVY09iobuqMcK00hiPyDj29' 
const stripe = require('stripe')(secretkey)
const path = require('path')
const bodyparser = require('body-parser')
app.use(express.static(path.join(__dirname,'./public')))
app.use(bodyparser.urlencoded({extended:true}))
const DOMAIN = 'http://localhost:7272'
app.post('/checkout-session',async(req,res)=>{
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
			    price_data: {
				  currency: 'inr',
				  product_data: {
				    name: 'Unibic Cookies',
				  },
				  unit_amount: 9500,
				},
				quantity: 1,  
			}
		   ],
		    mode: 'payment',
		    success_url: `${DOMAIN}/success.html`,
		    cancel_url: `${DOMAIN}/cancel.html`,
	})
	res.redirect(303,session.url)
})
app.listen(7272)
