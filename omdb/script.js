get=()=>{
	let name=document.getElementById('na').value
	let URL = `http://www.omdbapi.com/?t=${name}&apikey=2ef05862`
	fetch('URL')
	.then(response=>response.json())
	.then(cos=>{
			let tag=document.getElementById('place')
			tag.innerHTML=`
				<h1>Title: ${cos[0].Title}</h1>
				<h2>Year: ${cos[0].Year}</h2>
				<h2>Genre: ${cos[0].Genre}</h2>
			`
	})
}

