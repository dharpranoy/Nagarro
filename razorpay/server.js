const express = require('express')
const RazorPay = require('razorpay')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()
app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyparser.urlencoded({extended:true}))
const rpinstance = new RazorPay({
	key_id:'rzp_test_MRhf1kRC2Pob9R',
	key_secret:'NG7c4kGgsMR6xzLIgBiUmKXP'
})
app.post('/pushorder',(req,res)=>{
	const {amount,currency,reciept,notes} = req.body
	rpinstance.orders.create({amount,currency,reciept,notes},(err,order)=>{
		if (err) throw err
		res.json(order)
	})
})
app.listen(7272,()=>{
	console.log('started at 7272')
})

