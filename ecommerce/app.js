import express from "express"
import session from "express-session"
import bodyparser from "body-parser"
import multer from "multer"
import passport from "passport"
import path from "path"
import ensureLogin from 'connect-ensure-login'
const app = express()
const __dirname = path.resolve()
app.set('views','views')
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'./public')))
const upload = multer({dest:'./public/uploads/'})
app.use(bodyparser.urlencoded({limit:'50mb',extended:true}))
app.use(bodyparser.json({limit:'50mb'}))
app.use(session({
       secret:'Admin@fedora35',
       resave:true,
       saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
import { router } from './routes/auth.js'
app.use('/',router)
import { nrouter } from './routes/home.js'
app.use('/home',ensureLogin.ensureLoggedIn(),nrouter)
import { suggest } from './routes/suggest.js'
app.use('/suggest',ensureLogin.ensureLoggedIn(),suggest)
import { view } from './routes/product.js'
app.use('/view',ensureLogin.ensureLoggedIn(),view)
import { contact } from './routes/contact.js'
app.use('/createorder',ensureLogin.ensureLoggedIn(),contact)
const PORT = process.env.PORT || 6600
app.listen(PORT,()=>{
    console.log(`Running on ${PORT}`)
})
