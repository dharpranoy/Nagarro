class USER {
		constructor(userid,name,src,email){
			this.userid = userid
			this.name = userid
			this.src = src
			this.email = src
		}
}

loadfile=(event)=>{
	let image = document.getElementById('output')
	image.src = URL.createObjectURL(event.target.files[0])
}
$(document).ready(()=>{
		

		addcomments=(com)=>{
            $('#cmmt').val('')
			$('#allcm').val('')
			for (co of com){
					let inner = `
						<div id='cmmsg'>
                            <div id='comment-profile'>
                                <img  src='${co.dispic}' height=30 width=30 referrerpolicy='no-referrer'>
                                <h3>${co.username}</h3>
                            </div>
							<p>${co.txt}</p>
						</div>
		
						`
				$('#allcm').append(inner)
			}	
		}

    maketweet=(cos)=>{
        for (let i=0;i<cos.length;i++){
            $('#tw').val('')
            $('#output').attr('src','')
            let div = document.createElement('div')
            div.setAttribute('id', 'ttn')
            let indiv = document.createElement('div')
            indiv.setAttribute('id', 'twinfo')
            let img = document.createElement('img')
            img.setAttribute('src', `${cos[i].dispic}`)
            img.setAttribute('height', '30')
            img.setAttribute('width', '30')
            img.setAttribute('referrerpolicy', 'no-referrer')
            indiv.appendChild(img)
            let button = document.createElement('button')
            button.setAttribute('id', 'profilebtn')
            button.innerHTML=cos[i].username
            button.addEventListener('click', ()=>{
                fetch(`/profview?mail=${cos[i].email}`,{
                    method:'GET'
                })
                .then(res=>res.json())
                .then(cr=>{
                    
                })
            })
            indiv.appendChild(button)
            let p = document.createElement('p')
            p.innerHTML=`
                <p id='date'>${cos[i].post} ${cos[i].dates}</p>

            `
            indiv.appendChild(p)
            let media = ""
            if (cos[i].img!=""){
                console.log(cos[i].img)
                media=`<img src='${cos[i].img.substring(8,)}' id='twpic'>` 
            }
            let inner = `
                <div id='twcont'>
                    <p>${cos[i].txt}</p>
                    ${media}
                </div>
            `
            div.innerHTML = inner
            let intr = document.createElement('div')
            intr.setAttribute('id', 'interactions')
            let cbtn = document.createElement('button')
            cbtn.setAttribute('id', 'comment')
          	fetch(`/checkcomment?id=${cos[i].uid}`,{
          		method:'GET'	
          	})
          	.then(res=>res.json())
          	.then(comcnt=>{
							cbtn.innerHTML = `<img src='./src/comment.png' height=24 width=24> <p>${comcnt.count}<p/>`
          		            cbtn.addEventListener('click',()=>{
									$('#colon').html('')
									document.getElementById('addtweet').disabled = true
									let div = document.createElement('div')
									div.setAttribute('id','cmbar')
									let cmm = `
												<h2>${cos[i].username}</h2>
												<p>${cos[i].txt}</p>

													${media}
										`
								div.innerHTML = cmm
								let combox = document.createElement('div')
								combox.setAttribute('id','combox')
								combox.innerHTML = "<textarea placeholder='write comment...'  id='cmmt'></textarea>"
								let cmbtn = document.createElement('button')
								cmbtn.innerHTML = "Reply"
								cmbtn.setAttribute('id','addcmmt')
								cmbtn.addEventListener('click',()=>{
										if ($('#cmmt').val()!=""){
                                            let obj ={
                                                'id':`${cos[i].uid}`,
                                                'commentmsg':$('#cmmt').val()
                                            }
                                            fetch('/addcomment',{
                                                method:'POST',
                                                headers:{'Content-type':'application/json'},
                                                body:JSON.stringify(obj)
                                            })
                                            .then(res=>res.json())
                                            .then(cl=>{
                                                addcomments(cl)
                                            })
                                        }
								})
								let cmdiv = document.createElement('div')
								cmdiv.setAttribute('id','allcm')
								combox.appendChild(cmbtn)
								combox.appendChild(cmdiv)
								div.appendChild(combox)
								$('#colon').append(div)
								fetch(`/comments?id=${cos[i].uid}`,{
									method:'GET'
								})
								.then(res=>res.json())
								.then(rn=>{
										console.log(rn)
										addcomments(rn)
								})
          		})
            	let lbtn = document.createElement('button')
            	lbtn.setAttribute('id', 'like')
          		let path = 'heartno'
          		let cnt = 0
          		fetch(`/chklike?id=${cos[i].uid}`,{
          			method:'GET'
          		})
          		.then(res=>res.json())
          		.then(count=>{
                    	if (count.set==true) path = 'heart'
                    	cnt=count.cnt
                    	//console.log(cnt,path)
                    	lbtn.innerHTML = `<img src='./src/${path}.png' height=20 width=20>  <p>${cnt}</p>`
            					lbtn.addEventListener('click', ()=>{
            	  			let token = "is"
                			if (lbtn.firstElementChild.getAttribute('src')=="./src/heart.png"){
                    			lbtn.firstElementChild.setAttribute('src', "./src/heartno.png")
                            	token="no"
                            	let c = parseInt(`${lbtn.lastElementChild.innerHTML}`)
                            	c-=1
                            	lbtn.lastElementChild.innerHTML=c

                			}else{
                				token="is"
                    			lbtn.firstElementChild.setAttribute('src', "./src/heart.png")
                            	let c = parseInt(`${lbtn.lastElementChild.innerHTML}`)
                            	c+=1
                            	lbtn.lastElementChild.innerHTML=c

                			}
                        	fetch(`/like?q=${token}&id=${cos[i].uid}`,{
                            	method:'GET'
                        	})
            			})
            			intr.appendChild(cbtn)
            			intr.appendChild(lbtn)
            			div.appendChild(intr)
            			div.insertBefore(indiv, div.children[0])
            			$('#colon').prepend(div)
          		})
            		
          	})
            
        }
    }

    fetch('/recent',{
        method:'GET'
    })
    .then(res=>res.json())
    .then(cr=>{
        console.log(cr)
        maketweet(cr)
    })


    
    $('#tohome').click(()=>{
    	$('#colon').html('')
			document.getElementById('addtweet').disabled =false 
      let inner = `
      			<h2 id='page'>Home</h2> 
            <div id="twhead">
                <img src='<%= displaypicture %>' id="dp" referrerpolicy="no-referrer" height="40" width="40">
                <input type="text" id="tw" placeholder="What's happening?">
                <div id="twimg">
                    <img id="output">
                </div>
                <div id="inputln">
                    <ul id="input">
                      <li id="addimg">
                        <input type="file" accept="image/*" id="file" onchange="loadfile(event)" hidden>
                        <label for="file">
                            <img id="fim" src="./src/image.png" height="25" width="25" alt="image">
                        </label>
                      </li>
                    <li id="createpoll" ><img src="./src/statistics.png" height="25" width="25" alt="poll"></li>
                    <li id="addemo" ><img src="./src/happy.png" height="25" width="25" alt="emoji"></li>
                    </ul>
                    <button id="addtweet">Tweet</button>
                </div>
            </div>
            <div id="colon">
                   
        		</div>
      `	  
      //$('#conent').html(inner)
			fetch('/recent',{
        	method:'GET'
    	})
    	.then(res=>res.json())
    	.then(cr=>{
        	maketweet(cr)
    	})
    })
  	/*
    #('#toexplore').click(()=>{
        
    })
    #('#tonotification').click(()=>{
        
    })*/
    $('#addtweet').click(async()=>{
		let area = $('#tw').val()
        let file = document.querySelector('#file').files[0]
        if (file){
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload=()=>{ 
                let img = reader.result.split(",")[1]
                let obj = {
                    'txt':`${area}`,
                    'img':`${img}`
                }
                if (area!=""){
                    fetch('/addtweet',{
                        method:'POST',
                        headers:{'Content-type':'application/json'},
                        body:JSON.stringify(obj)
                    })
                    .then(res=>res.json())
                    .then(cos=>{
                        maketweet(cos)	
                    })
                }

            }
        }else{
            let obj = {
                    'txt':`${area}`,
                    'img':''
                }
                if (area!=""){
                    fetch('/addtweet',{
                        method:'POST',
                        headers:{'Content-type':'application/json'},
                        body:JSON.stringify(obj)
                    })
                    .then(res=>res.json())
                    .then(cos=>{
                        maketweet(cos)	
                    })
                }

        }
    })
})
