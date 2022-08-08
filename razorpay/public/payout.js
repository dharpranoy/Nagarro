$(document).ready(()=>{
	$('#onpay').click(()=>{
		let options = {
			'amount':'9500',
			'currency':'INR',
			'receipt':'PRND',
			'notes':{
				'quote':'developer testing'
			}
		}
		fetch('/pushorder',{
			method:'post',
			headers:{'Content-type':'application/json'},
			body:JSON.stringify(options)
		})
		.then(res=>res.json())
		.then(cos=>{
			let options = {
				'key':'rzp_test_MRhf1kRC2Pob9R',
				'amount':`${cos.amount}`,
				'currency':'INR',
				'name':'Unibic Cookie',
				'description':'Choco chips 200g handmade cookies',
				'image':'./',
				'order_id':`${cos.order_id}`,
				'handler':response=>{
					console.log(response)
					alert('successfully done')
				},
				'prefill':{
					'contact':'8145691780',
					'name':'Alfa C',
					'email':'alfac.787B@gmail.com'
				},
				'notes':'Developer testing his software @pnd'

			}
			let razorpayob = new Razorpay(options)
			console.log(razorpayob)
			razorpayob.open()
			razorpayob.on('payment.failed',(response)=>{
				alert('failed')
			})
			
		})
	})
})



