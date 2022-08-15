loadfile=(event)=>{
	let image = document.getElementById('output')
	image.src = URL.createObjectURL(event.target.files[0])
}
$(document).ready(()=>{
    $('#content').html(`
        <h2>Home</h2> 
        <div id="header">
            <img src='<%= displaypicture %>' height="40" width="40">
            <input type="text" id="tw" placeholder="What's happening?">
            <div id="twimg">
                <img id="output">
            </div>
            <div id="inputln">
            <ul id="input">
              <li id="addimg">
                <input type="file" id="file" onchange="loadfile(event)" hidden>
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

	`)
    #('#tohome').click(()=>{
        
    })
	$('#addtweet').click(()=>{
		let area = $('#tw').val()
		let obj = {
			'txt':`${area}`
		}
		if (area!=""){
			fetch('/addtweet',{
				method:'POST',
				headers:{'Content-type':'application/json'},
				body:JSON.stringify(obj)
			})
			.then(res=>res.json())
			.then(cos=>{
				$('#tw').val('')
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
				button.innerHTML=cos.username
				button.addEventListener('click', ()=>{
					fetch('/profview',{
						method:'POST',
						body:`${cos.email}`
					})
					.then()
				})
				indiv.appendChild(button)
			  	let p = document.createElement('p')
				p.innerHTML=`
					<p>${cos.uuid}</p>
					<p>${cos.time} ${cos.date}</p>

				`
				indiv.appendChild(p)
				let inner = `
					<div id='twcont'>
						<p>${area}</p>
					</div>
					<div id='interactions'>
					<button id='comment'><img src='./src/heart (1).png' height=20 width=20></button>
					<button id='like'><img src='./src/comment.png' height=24 width=24></button>
					</div>
				`
				div.innerHTML = inner
				div.insertBefore(indiv, div.children[0])
				$('#colon').prepend(div)

			})
		}
	})
})
