$(document).ready(function(){
  $('#username').keyup(()=>{
    let tag=document.getElementById('username').value
    $('#warn-name').html('')
    if (tag.length<3){
      $('#warn-name').html('Username should be atleast three characters long')
    }
  })
  $('#email').keyup(()=>{
    let tag=document.getElementById('email').value
    $('#warn-email').html('')
    if (tag.search('@gmail.com')==-1){
      $('#warn-email').html('Please enter a valid email')
    }
  })
  $('#age').keyup(()=>{
    let tag=document.getElementById('age').value
    $('#warn-num').html('')
    if (tag<18){
      $('#warn-num').html('Candidate must be greater than 17 years')
    }
  })
  $('#passwd').keyup(()=>{
    let tag=document.getElementById('passwd').value
    if (tag.length<8){
      $('#warn-ch').html('Password should be at least 8 characters long')
    }else if (tag.search('[0-9]')==-1){
      $('#warn-ch').html('Password does not contain numbers')
    }else if (tag.search('[A-Z]')==-1){
      $('#warn-ch').html('Password must have at least one upper case alphabet')
    }else if (tag.search('[a-z]')==-1){
      $('#warn-ch').html('Password must have at least one lower case alphabet')
    }else if (tag.search('[!@#$%^&*()+=<>?]')==-1){
      $('#warn-ch').html('Password must have at least one special character')
    }else{
      $('#warn-ch').html('')
    }
  })
  $('#passwdc').keyup(()=>{
    let tag=document.getElementById('passwd').value
    let chk=document.getElementById('passwdc').value
    if (tag!=chk){
      $('#warn-pass').html('Password does not match')
    }else{
      $('#warn-pass').html('')
    }
  })
})
