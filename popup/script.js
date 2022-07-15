
let valid=true
let mailv=true
$(document).ready(()=>{
	$('.pop').click(()=>{
		$('#name').text('')
		$('#mail').text('')
		$('#box').addClass('show')
	})

	$('#close').click(()=>{
		$('#box').removeClass('show')		
	})

	$('#uname').keyup(()=>{
		let name=$('#uname').val()
		$('#warn-name').text('')
		if (name.length>=3){
			valid=true
		}else{
			console.log('here')
			valid=false
			$('#warn-name').text('Invalid username')
		}
		console.log(valid)
	})

	$('#mail').keyup(()=>{
		let mail=$('#mail').val()
		$('#warn-mail').text('')
		let regex=/^([\-\.0-9a-zA-Z]+)@([\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
		if (regex.test(mail)){
			
			mailv=true
		}else{
			mailv=false
			$('#warn-mail').text('Invalid email')
		}
		console.log(valid)
	})
	
	
	$('#submission').click(()=>{
		if (valid==true && mailv==true){
			$('#uname').text('')
			$('#mail').text('')
			$('#box').removeClass('show')
		}
	})
	

})
