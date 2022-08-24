import express from 'express'
const router = express.Router()
import { conn } from './db.js'
router.get('/',(req,res)=>{
    res.render('contact',{
        'id':`${req.query.id}`,
        'no':`${req.query.no}`
    })
})
router.get('/pushorder',(req,res)=>{
    let qr = `INSERT INTO orders values('${req.user.email}','${req.query.id}','${req.query.no}','${req.query.addr}')`
    conn.query(qr,(err,result)=>{
        if (err) throw err
        res.send('ok')
    })
})
export let contact = router
