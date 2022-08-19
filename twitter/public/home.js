loadfile=(event)=>{
	let image = document.getElementById('output')
	image.src = URL.createObjectURL(event.target.files[0])
}
$(document).ready(()=>{
    maketweet=(cos)=>{
        for (let i=0;i<cos.length;i++){
            $('#tw').val('')
            $('#output').attr('src','')
            let div = document.createElement('div')
            div.setAttribute('id', 'ttn')
            let indiv = document.createElement('div')
            indiv.setAttribute('id', 'twinfo')
            let img = document.createElement('img')
            img.setAttribute('src', './src/image.png')
            img.setAttribute('height', '30')
            img.setAttribute('width', '30')
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
            cbtn.innerHTML = "<img src='./src/comment.png' height=24 width=24>"
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
            
        }
    }

    fetch('/recent',{
        method:'GET'
    })
    .then(res=>res.json())
    .then(cr=>{
        maketweet(cr)
    })


    /*
    #('#tohome').click(()=>{
        
    })
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
                console.log(img)
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
