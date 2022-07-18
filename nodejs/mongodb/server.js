const express = require('express')
const app = express()
const mongo = require('mongodb').MongoClient
let URL = 'mongodb://localhost:27017/'
mongo.connect(URL,(err,conn)=>{
  if (err) throw err
  console.log('connected')
  let db=conn.db('cred')
  let token = {}
  db.collection('movies').find(token).toArray((error,result)=>{
    if (error) throw error
    console.log(result)
    conn.close()
  })
})
app.listen(4100)

