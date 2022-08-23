$(document).ready(()=>{
    /*fetch('/suggest',{
        method:'GET'
    })
    .then(res=>res.json())
    .then(cos=>{
    
    })*/
    $('#addproduct').click(()=>{
        $('#hover').html('')
        let outer = document.createElement('div')
        outer.setAttribute('id', 'product-info')
        let inner = document.createElement('div')
        inner.setAttribute('id', 'product-container')
        let html = `
                    <div id='product-np'>
                        <input type='text' id='product-name' placeholder='Enter Product Name'>
                        <input type='number' id='product-price' placeholder='Price in INR'>
                    </div>
                    <div>
                        <textarea id='product-desc' placeholder='Enter product details'></textarea>
                    </div>
                    <div>
                        <select class="form-select form-select-sm" id='product-category' aria-label=".form-select-sm example">
                          <option value="Electronics">Electronics</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Beverage">Beverage</option>
                          <option value="Smartphone">Smartphone</option>
                          <option value="Musicsytem">Musicsytem</option>
                          <option value="Groceries">Groceries</option>
                          <option value="Miscelleneous" selected>Miscelleneous</option>
                          <option value="Books">Books</option>
                        </select>
                    </div>
                    <div>
                    <input type="file" accept="image/*" id="file" hidden>
                    <label for="file">
                        <img id="fim" src="./src/image.png" height="25" width="25" alt="image">
                    </label>
                    </div>
        `
        inner.innerHTML=html
        let btn = document.createElement('button')
        btn.setAttribute('id', 'add-product-btn')
        btn.innerHTML='Add'
        btn.addEventListener('click', productadd)
        inner.appendChild(btn)
        outer.appendChild(inner)
        $('#hover').append(outer)
    })
    productadd=()=>{
        let pname = $('#product-name').val().replace("'","''")
        let price = $('#product-price').val()
        let desc = $('#product-desc').val().replace("'","''")
        let category = $('#product-category').val()
        let pic = document.querySelector('#file').files[0]
                console.log('here')
        if (pic && pname!="" && price>0){
            console.log('here')
            const reader = new FileReader()
            reader.readAsDataURL(pic)
            reader.onload=()=>{
                let img = reader.result.split(",")[1]
                let obj = {
                    'pname':`${pname}`,
                    'price':`${price}`,
                    'desc':`${desc}`,
                    'pic':`${img}`,
                    'category':`${category}`
                }
                console.log('here')
                fetch('/home/addproduct',{
                    method:'POST',
                    headers:{'Content-type':'application/json'},
                    body:JSON.stringify(obj)
                })
                .then(co=>{
                   $('#product-name').val('')
                   $('#product-price').val('')
                   $('#product-desc').val('')
                    let alt = `<div class="alert alert-success" role="alert">
                        A simple success alert—check it out!
                    </div>`
                    $('#product-info').append(alt)
                })
            }
        }
    }
    
})
