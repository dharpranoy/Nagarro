$(document).ready(()=>{
  $('#send').click(()=>{
    let to = $('#mail').val()
    let txt = $('#msg').val()
    Email.send({
      //58ee03e5-099c-4502-bf44-20b408bd2517
      //e492b8ae-7f40-42bc-8599-a3d9234afa4c
      SecureToken:'e492b8ae-7f40-42bc-8599-a3d9234afa4c',
      To:`${to}`,
      From:'tutor.pnd19@gmail.com',
      Subject:'Simple Mail',
      Body:`${txt}`
    })
    .then(
      console.log('message sent')
    )
  })
})
