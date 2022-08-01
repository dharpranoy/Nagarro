const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')()
const path = require('path')
const sql = require('mysql')
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'/public')))
let conn = sql.createConnection({
	host:'localhost',
	user:'root',
	password:'localmux@34',
	database:'lambda'
})
conn.connect(err=>{
	if (err) throw err
	console.log('Connected')
})

app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/public/index.html')
})
app.get('/addmovie',(req,res)=>{
	let name = req.query.name
	let genre = req.query.genre
	let year = req.query.year
	let stm = `INSERT INTO movies VALUES ('${name}','${genre}','${year}')`
	conn.query(stm,(err,result)=>{
		if (err) throw err
		console.log('successfully added')
	})
	res.send('ok')
})
app.post('/addmovie',(req,res)=>{
	let name = req.body.name
	let genre = req.body.genre
	let year = req.body.year
	let stm = `INSERT INTO movies VALUES ('${name}','${genre}','${year}')`
	conn.query(stm,(err,result)=>{
		if (err) throw err
		console.log('successfully added')
	})
	res.send('ok')
})
app.listen(3300)
