let options = {
	'key':'rzp_test_MRhf1kRC2Pob9R',
	'amount':'9500',
	'currency':'INR',
	'name':'Unibic Cookie',
	'description':'Choco chips 200g handmade cookies',
	'image':'./',
	'order_id':'ABC2022',
	'handler':response=>{
		console.log(response)
		alert('successfully done')
	},
	'prefill':{
		'contact':'8145691787',
		'name':'Alfa C',
		'email':'alfac.787B@gmail.com'
	},
	'notes':'Developer testing his software @pnd'

}
let razorpayob = new Razorpay(options)
console.log(razorpayob)
razorpayob.on('payment.failed',(response)=>{
	alert('failed')
})
$(document).ready(()=>{
	$('#onpay').click(()=>{
		razorpayob.open()
	})
})

