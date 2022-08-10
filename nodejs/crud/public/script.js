$(document).ready(function(){
  $('#add').click(function(){
    let item=$('#process').val()
    if (item!=""){
	let obj = {
		'data':`${item}`
	}
      	fetch('/addtask',{
		method:'POST',
		headers:{'Content-type':'application/json'},
		body:JSON.stringify(obj)
	})
	.then(res=>res.json())
	.then(cos=>{

		alert('Added')
	})

    		$('#process').val('')
    }
	
    
  })
 $('#fetch').click(function(){
 	fetch('/fetchtask',{
		method:'get'
	})
	 .then(res=>res.json())
	 .then(cos=>{
	      $('#ls').html('')
	      for (co of cos){
		      let li=document.createElement('li')
		      let p=document.createElement('p')
		      p.innerHTML=co.txt
		      let bt=document.createElement('button')
		      bt.innerHTML='<i class="fa-solid fa-trash-can"></i>'
		      console.log(co.txt)
		      bt.addEventListener('click',function(){
			   fetch('/deltask',{
				method:'POST',
				headers:{'Content-type':'application/json'},
				body:JSON.stringify({'id':`${p.innerHTML}`})
			   })
			   .then(res=>{
			   	this.parentElement.style.display='none'
			   })
		      })
		      li.appendChild(p)
		      li.appendChild(bt)
		      $('#ls').append(li)
	  	}
	 })
 })

  
})

