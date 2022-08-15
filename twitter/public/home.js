loadfile=(event)=>{
	let image = document.getElementById('output')
	image.src = URL.createObjectURL(event.target.files[0])
}
$(document).ready(()=>{
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
				console.log(cos)
				let user = cos.username
				let uuid = cos.uuid
				let inner = `
					<div id='ttn'>
						<div id='twinfo'>
							<img src='./src/image.png' height=30 width=40>
							<h2>${user}</h2>
							<p>${uuid}</p>
						</div>
						<div id='twcont'>
							<p>${area}</p>
						</div>
						<div id='interactions'>
						<button id='comment'><img src='./src/heart (1).png' height=20 width=20></button>
						<button id='like'><img src='./src/comment.png' height=20 width=20></button>
						</div>
					</div>
				`
				$('#colon').prepend(inner)

			})
		}
	})
})
