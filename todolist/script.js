$(document).ready(function(){
  $('#add').click(function(){
    let item=$('#process').val()
    if (item!=""){
      let li=document.createElement('li')
      let p=document.createElement('p')
      p.innerHTML=item
      let bt=document.createElement('button')
      bt.innerHTML='<i class="fa-solid fa-trash-can"></i>'
      bt.addEventListener('click',function(){
           this.parentElement.style.display='none' 
      })
      li.appendChild(p)
      li.appendChild(bt)
      $('#ls').append(li)
      
    }
    $('#process').val('')
    
  })
  
})

