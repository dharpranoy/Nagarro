$(document).ready(()=>{
	$('#get').click(()=>{
		let name=$('#name').val()
		let genre=$('#genre').val()
		let year=$('#year').val()
		fetch(`/addmovie?name=${name}&genre=${genre}&year=${year}`,{
			method:'GET'
		})
		.then(res=>{
			console.log('Successfully added')
		})
	})
	$('#post').click(()=>{
		let obj = {
			'name':$('#name').val(),
			'genre':$('#genre').val(),
			'year':$('#year').val()
		}
		fetch('/addmovie',{
			method:'POST',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify(obj)
		})
		.then(res=>{
			console.log('Successfully added')
		})
	})

})
