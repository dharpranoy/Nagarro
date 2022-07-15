
let valid=true
let mailv=true
$(document).ready(()=>{
	let valid=false
	$('.pop').click(()=>{
		valid=false
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
		console.log(valid)
		if (valid==true && mailv==true){

	$('#mail').keyup(()=>{
		let mail=$('#mail').val()
		let regex=/^([\-\.0-9a-zA-Z]+)@([\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
		if (regex.test(mail)){
			valid=valid&true
			$('#warn-mail').text('')
		}else{
			valid=valid&false
			$('warn-mail').text('Invalid email')
		}
	}
	$('#uname').keyup(()=>{
		let name=$('#uname').val()
		if (name.length>=3){
			valid=valid&true
			$('#warn-name').text('')
		}else{
			valid=valid&false
			$('warn-name').text('Invalid username')
		}
	})
	$('#submission').click(()=>{
		if (valid==true){
			$('#uname').text('')
			$('#mail').text('')
			$('#box').removeClass('show')
		}
	})
	

})
