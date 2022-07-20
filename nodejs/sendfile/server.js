const http = require('http')
const fs = require('fs')
http.createServer((req,res)=>{
	fs.readFile('./index.html',(error,page)=>{
		if (error){ 
			res.writeHead(404)
			res.write('Not Found')
		}else{
			res.writeHead(200,{'Content-Type':'text/html'})
			res.write(page)
		}

	})
}).listen(5200)
