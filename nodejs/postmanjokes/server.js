const express = require('express')
const app = express()
const axios = require('axios')
const sql = require('mysql')
let conn = sql.createConnection({
	host:'localhost',
	user:'root',
	password:'localmux@34',
	database:'cats'
})
conn.connect((err)=>{
	if (err) throw err
})
axios.get('https://backend-omega-seven.vercel.app/api/getjoke')
.then(response=>response.data)
.then(cos=>{
	console.log(cos[0])
	conn.query(`INSERT INTO jokesapi VALUES ('${cos[0].question}','${cos[0].punchline}')`,(error,result)=>{
		if (error) throw error
		console.log('Joke successfully inserted')
	})
})

app.listen(3300)

