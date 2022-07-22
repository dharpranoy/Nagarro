get=()=>{
	let name=document.getElementById('na').value
	let URL = `http://www.omdbapi.com/?t=${name}&apikey=2ef05862`
	fetch('URL')
	.then(response=>response.json())
	.then(cos=>{
			let tag=document.getElementById('place')
			tag.innerHTML=`
				<h1>Title: ${cos.Title}</h1>
				<h2>Year: ${cos.Year}</h2>
				<h2>Genre: ${cos.Genre}</h2>
			`
	})
}

