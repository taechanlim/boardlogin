const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const session = require('express-session')
const { urlencoded } = require('express')
const Memorystore = require('memorystore')(session)
const router = require('./routes/index')


app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
})

//3가지 중요요소
//암호화
//세션을 저장할 공간
//쿠키의 설정
const maxAge = 5*60*1000 //시간초 설정
let sessionObj = {
    secret:"web7722",
    resave: false,
    saveUninitialized:true,
    store:new Memorystore({ checkPeriod: maxAge }),
    cookie:{
        maxAge:maxAge
    }
}
app.use(session(sessionObj))
app.use(express.urlencoded({extended:true,}))
app.use(router)

router.get('/',(req,res)=>{
    const {user} = req.session
    res.render('index',{
        user
    })
})

app.listen(3000,()=>{
    console.log('server on')
})