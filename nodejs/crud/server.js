const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const session = require('express-session')
const multer = require('multer')()
const sql = require('mysql')
const path = require('path')
app.use(express.static(path.join(__dirname,'/public')))
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.json())
let conn = sql.createConnection({
	host:'localhost',
	user:'root',
	password:'localmux@34',
	database:'dolist'
})
conn.connect((err)=>{
	if (err) throw err
	console.log('connected')
})
app.post('/addtask',(req,res)=>{
	let txt = req.body.data
	console.log(req.body)
	let query = `INSERT INTO tasks values('${txt}')`
	conn.query(query,(err,result)=>{
		if (err) throw err
		res.send('ok')
	})
})
app.post('/deltask',(req,res)=>{
	let txt = req.body.id
	console.log(req.body)
	let query = `delete from tasks where txt='${txt}'`
	conn.query(query,(err,result)=>{
		if (err) throw err
		res.send('ok')
	})

})
app.get('/fetchtask',(req,res)=>{
	let query = 'SELECT * FROM tasks'
	conn.query(query,(err,result)=>{
		res.send(result)
	})
})
app.listen(3300)
