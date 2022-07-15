$(document).ready(()=>{
	$('.pop').click(()=>{
		$('#box').addClass('show')
	})

	$('#close').click(()=>{
		$('#box').removeClass('show')		
	})
	let valid=false
	$('#mail').keyup(()=>{
		let mail=$('#mail').val()
		let mail=document.getElementById('mail').value
		let regex=/^([\-\.0-9a-zA-Z]+)@([\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
		if (mail.test(regex)){
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
