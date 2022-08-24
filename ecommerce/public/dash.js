$(document).ready(()=>{
    suggestion=()=>{
        fetch('/suggest',{
            method:'GET'
        })
        .then(res=>res.json())
        .then(cos=>{
            $('#hover').html('')
               for (const co of cos){
                    let data = `
                        <div id='suggestion-card'>
                        <div class="card">
                          <img src="${co.img}" id='card-img-product' alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${co.name}</h5>
                            <a href="/view?id=${co.uid}" class="btn btn-primary">View</a>
                            <a class="btn btn-success">${co.price} /-</a>
                          </div>
                        </div>
                        </div>
                   `
                    $('#hover').append(data) 
               }
        })
    }
    suggestion()
    $('#suggest').click(()=>{
        suggestion()
    })
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
    $('#products').click(()=>{
        let inner =`
        <button class='btn btn-primary' id="Electronics">Electronics</button>
        <button class='btn btn-primary' id="Clothing">Clothing</button>
        <button class='btn btn-primary' id="Beverage">Beverage</button>
        <button class='btn btn-primary' id="Smartphone">Smartphone</button>
        <button class='btn btn-primary' id="Musicsytem">Musicsytem</button>
        <button class='btn btn-primary' id="Groceries">Groceries</button>
        <button class='btn btn-primary' id="Miscelleneous">Miscelleneous</button>
        <button class='btn btn-primary' id="Books">Books</button>
        `
        $('#hover').html(`
                <div id='category-container'>
                    ${inner}
                </div>
                <div id='category-list'></div>
        `)
        let ele = document.getElementsByTagName('button')
        for (let i=0;i<ele.length;i++){
            ele[i].addEventListener('click',(e)=>{
                let type = ele[i].id
                fetch(`/suggest/filter?type=${type}`,{
                    method:'get'
                })
                .then(res=>res.json())
                .then(cos=>{
                    $('#category-list').html('')
                   for (const co of cos){
                        let data = `
                            <div id='suggestion-card'>
                            <div class="card">
                              <img src="${co.img}" id='card-img-product' alt="...">
                              <div class="card-body">
                                <h5 class="card-title">${co.name}</h5>
                                <a href="/view?id=${co.uid}" class="btn btn-primary">View</a>
                                <a class="btn btn-success">${co.price} /-</a>
                              </div>
                            </div>
                            </div>
                       `
                        $('#category-list').append(data) 
                   }
                })
            })
        }

    })
    $('#kart').click(()=>{
        fetch('/suggest/kart',{
            method:'GET'
        })
        .then(res=>res.json())
        .then(co=>{
            $('#hover').html('')
           let outer = document.createElement('div')
            outer.setAttribute('id', 'kart-container')
            for (p of co){
                let inner = document.createElement('div')
                inner.setAttribute('id', 'kart-item')
                inner.innerHTML = `
                    <div>
                        <img id='card-img-product' src='${p.img}'>
                        <h3>${p.name}</h3>
                        <p>₹${p.price}/-</p>
                    </div>
                                    `
                outer.appendChild(inner)
                let linear = document.createElement('div')
                let div = document.createElement('div')
                div.setAttribute('id','kart-item-no')
                div.innerHTML = `<p>${p.itemno}</p>`
                let decp = document.createElement('a')
                decp.innerHTML = "-"
                decp.setAttribute('id', 'decrement-product')
                decp.setAttribute('class', 'btn btn-danger')
                let xxid = p.uid
                inner.setAttribute('onclick', ()=>{
                    window.location=`'/view?id=${xxid}'`
                })

                decp.addEventListener('click', ()=>{
                    let cnt = parseInt(div.firstElementChild.innerHTML)
                    if (cnt>1) {
                        cnt-=1
                        fetch(`/suggest/decrement?id=${xxid}`,{
                            method:'get'
                        })
                        .then(xh=>{
                              div.firstElementChild.innerHTML = cnt 
                        })
                    }
                })
                div.appendChild(decp)
                let incp = document.createElement('a')
                incp.innerHTML="+"
                incp.setAttribute('id', 'increment-product')
                incp.setAttribute('class', 'btn btn-success')
                incp.addEventListener('click', ()=>{
                    let cnt = parseInt(div.firstElementChild.innerHTML)
                    if (cnt<10){
                        cnt+=1
                        fetch(`/suggest/increment?id=${xxid}`,{
                            method:'get'
                        })
                        .then(xh=>{
                            div.firstElementChild.innerHTML = cnt 
                        })
                    }
                })
                div.appendChild(incp)
                linear.appendChild(div)
                let bk = document.createElement('a')
                bk.setAttribute('href', `/createorder?id=${p.uid}&no=${parseInt(div.firstElementChild.innerHTML)}`)
                bk.setAttribute('class', 'btn btn-primary')
                bk.innerHTML = "Place Order"
                let delbtn = document.createElement('button')
                delbtn.setAttribute('class', 'btn btn-warning')
                delbtn.innerHTML="DEL"
                delbtn.addEventListener('click', ()=>{
                    fetch(`/suggest/deletekart?id=${xxid}`,{
                        method:'GET'
                    })
                    .then(th=>{
                        delbtn.parentElement.parentElement.style.display = 'none'
                    })
                })
                linear.appendChild(bk)
                linear.appendChild(delbtn)
                inner.appendChild(linear)
            }
            $('#hover').append(outer)
        })
    })
    $('#order_hist').click(()=>{
        $('#hover').html('')
        fetch('/home/orders',{
            method:'GET'
        })
        .then(res=>res.json())
        .then(cos=>{
            for (const co of cos){
                    let data = `
                        <div id='order-card'>
                        <div class="card-b">
                          <img src="${co.img}" id='order-img-product' alt="...">
                          <div class="card-body">
                            <h5 class="card-title">${co.name} <br/> &#127744; itemcount: ${co.itemno} <br/> Price:₹${parseInt(co.price) * co.itemno} /-</h5>
                            <a href="/view?id=${co.uid}" class="btn btn-primary">Return</a>
                            <a class="btn btn-success">Download Invoice</a>
                          </div>
                        </div>
                        </div>
                   `
                    $('#hover').append(data) 
               }

        })
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
                        Product added successfully
                    </div>`
                    $('#product-info').html(alt)
                })
            }
        }
    }
    
})
