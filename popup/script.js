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
