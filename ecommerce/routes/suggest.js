import express from 'express'
const router = express.Router()
import { conn } from './db.js'
router.get('/',(req,res)=>{
    let qr = `SELECT p1.uid,name,description,price,img from products p1 inner join productdesc d1 on p1.uid=d1.uid`
    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send(result.rows)
    })
})
router.get('/filter',(req,res)=>{
    let qr = `SELECT p1.uid,name,description,price,img from products p1 inner join productdesc d1 on p1.uid=d1.uid and d1.category='${req.query.type}'`

    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send(result.rows)
    })
})
router.get('/kart',(req,res)=>{
    let qr = `SELECT p1.uid,img,name,price,itemno FROM products p1 inner join kart k1 on p1.uid = k1.uid and k1.email = '${req.user.email}'`
    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send(result.rows)
    })

})
router.get('/increment',(req,res)=>{
    let qr = `UPDATE kart SET itemno = itemno+1 WHERE email = '${req.user.email}' and uid = '${req.query.id}'`
    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send('ok')
    })
})
router.get('/decrement',(req,res)=>{
    let qr = `UPDATE kart SET itemno = itemno-1 WHERE email = '${req.user.email}' and uid = '${req.query.id}'`
    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send('ok')
    })
})
router.get('/deletekart',(req,res)=>{
    let qr = `DELETE FROM kart where email = '${req.user.email}' and uid = '${req.query.id}'` 
    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send('ok')
    })
})

export let suggest = router
