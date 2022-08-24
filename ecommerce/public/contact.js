$(document).ready(()=>{
    $('#make-order').click(()=>{
        let id = $('.fa').attr('id')
        let no = $('.ma').attr('id')
        let addr = $('#addr1').val()+" "+$('#addr2').val()+" "+$('#addr3').val()
        fetch(`/createorder/pushorder?id=${id}&no=${no}&addr=${addr}`,{
            method:'GET'
        })
        .then(co=>{
            window.location='/home'
        })
    })

})
