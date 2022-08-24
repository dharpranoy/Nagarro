$(document).ready(()=>{
    $('#add-kart').click(()=>{
        let id = $('.cvp').attr('id')
        fetch(`/view/addtokart?id=${id}`,{
            method:'GET'
        })
        .then(co=>{
            let post = `<div class="alert alert-info" role="alert">
                  Added to kart
                </div>
                <a href="/home" class="btn btn-danger">Go Back</a> `
            $('#back').html(post)
        })
    })
    /*$('#make-order').click(()=>{
        let id = $('.cvp').attr('id')
        fetch(`/view/createorder?id=${id}&no=1`,{
            method:'GET'
        })
    })*/

})
