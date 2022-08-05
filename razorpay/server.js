const express = require('express')
const RazorPay = require('razorpay')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
const rpinstance = new RazorPay({
	key_id:'rzp_test_MRhf1kRC2Pob9R',
	key_secret:'NG7c4kGgsMR6xzLIgBiUmKXP'
})
app.post('/pushorder',async(req,res)=>{
	const {amount,currency,receipt,notes} = req.body
	console.log({amount,currency,receipt,notes} )
	try{
		let response = await rpinstance.orders.create({amount,currency,receipt,notes})
		res.json({
			order_id: response.id,
            		currency: response.currency,
            		amount: response.amount
		})
	}catch(error){
		console.log(error)
	}
})
app.listen(7272,()=>{
	console.log('started at 7272')
})

