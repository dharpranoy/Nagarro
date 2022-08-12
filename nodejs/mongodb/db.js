const mongo = require('mongodb').MongoClient
let URL = 'mongodb://localhost:27017/'
let db = null
mongo.connect(URL,async(err,conn)=>{
  if (err) throw err
  console.log('connected')
  db=conn.db('lambda')
})
db.collection('comments').find({}).toArray((error,result)=>{
    	if (error) throw error
    	console.log(result)
     })




