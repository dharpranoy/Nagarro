const express = require('express')
const app = express()
const { Pool } = require('pg')
const pool = new Pool({
	user:'postgres',
	database:'qual',
	password:'secret123',
	port:5432,
	host:'localhost',
})
pool.connect((err,client,done)=>{
	if (err) throw err
	client.query('SELECT * FROM t',(error,result)=>{
		console.log(result.rows)
	})
})
app.listen(3300)

/*My DataBase PranoyDhar => 
 *
 postgres=# \c qual;
You are now connected to database "qual" as user "postgres".
qual=# SELECT * FROM t;
 id |     name     |  price  
----+--------------+---------
  1 | LS3          | 9000.00
  2 | Tremec T2150 | 6000.00
  3 | Turbo xsde   |  700.00
(3 rows)
 */
