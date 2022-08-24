import express from 'express'
const router = express.Router()
import { conn } from './db.js'
router.get('/',(req,res)=>{
    let qr = `SELECT * FROM products p1 inner join productdesc d1 on p1.uid = d1.uid and p1.uid = '${req.query.id}'`
    conn.query(qr,(err,result)=>{
        if (err) throw err
        result = result.rows
        res.render('productview',result[0])
    })
})
router.get('/addtokart',(req,res)=>{
    let qr = `INSERT INTO kart(email,uid) values ('${req.user.email}','${req.query.id}')`
    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send('ok')
    })
})
export let view = router
