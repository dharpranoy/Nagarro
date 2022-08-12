const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const multer = require('multer')()
const session = require('express-session')
const mongo = require('mongodb').MongoClient
let URL = 'mongodb://localhost:27017/'
let db = null
mongo.connect(URL,async(err,conn)=>{
  if (err) throw err
  console.log('connected')
  db=conn.db('lambda')
})
app.use(bodyparser.urlencoded({extended:true}))
app.get('/retrieve',(req,res)=>{
	let token = {}
	db.collection('comments').find(token).toArray((error,result)=>{
    	if (error) throw error
    	console.log(result)
		res.send(result)
     })

})
app.post('/notes',(req,res)=>{
	const notes = { text:req.body.txt, title:req.body.title }
	db.collection('comments').insert(notes,(err,result)=>{
		res.send(result)
	})
})
app.listen(4100)

