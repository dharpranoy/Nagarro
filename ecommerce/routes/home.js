import express from 'express'
import { conn } from './db.js'
import crypto from 'crypto'
import jimp from 'jimp'
const nrouter = express.Router()
nrouter.get('/',(req,res)=>{
    res.render('dash',{
        'username':`${req.user.username}`
    })
})
nrouter.post('/addproduct',(req,res)=>{
    let uid = crypto.randomUUID()
    const buffer = Buffer.from(req.body.pic,"base64")
    let path = '/uploads/'+`${uid}.jpg`
    jimp.read(buffer,(err,result)=>{
        result.quality(0).write('./public'+path)
    })
    let qr = `INSERT INTO products values ('${uid}','${req.body.pname}','${req.body.price}','${path}')` 
    conn.query(qr,(err,result)=>{
        if (err) throw err
        qr = `INSERT INTO productdesc values ('${uid}','${req.body.desc}','${req.body.category}')`
        conn.query(qr,(err2,result2)=>{
            if (err2) throw err2
            res.send('ok')
        })
    })
})
nrouter.get('/orders',(req,res)=>{
    let qr = `SELECT o1.uid,itemno,price,img,name FROM orders o1 inner join products p1 on o1.uid = p1.uid and o1.email='${req.user.email}'`
    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send(result.rows)
    })
})
export { nrouter }
