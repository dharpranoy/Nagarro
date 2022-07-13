handler=()=>{
	let txt=document.getElementById('text1')
	txt.select()
	txt.setSelectionRange(0,1000)
	navigator.clipboard.writeText(txt.value)
}
$(document).ready(function(){
	$('#btn').click(function(){
		$('#text1').select()
		document.execCommand("copy")	
	})
})
