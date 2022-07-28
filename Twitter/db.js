const sql = require('mysql')
let conn = sql.createConnection({
	host:'localhost',
	user:'root',
	password:'mysql#pypi',
	database:'passport'
})
conn.connect(err=>{
	if (err) throw err
	console.log('connected')
})

