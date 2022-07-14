$(document).ready(()=>{
	$('.pop').click(()=>{
		$('#box').addClass('show')
	})

	$('#close').click(()=>{
		$('#box').removeClass('show')		
	})
	$('#submission').click(()=>{
		let valid=true
		let name=document.getElementById('uname').value
		if (name.length<3){
			valid=valid&false
			$('#warn-name').text('Invalid username')
		}
		let mail=document.getElementById('mail').value
		if (mail.search('@gmail.com')==-1){
			valid=valid&false
			$('#warn-mail').text('Invalid email')
		}
		if (valid==true){
			$('warn-name').text('')
			$('warn-mail').text('')
			$('#box').removeClass('show')
		}
	})
	

})
