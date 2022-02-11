const express = require('express')
const router = express.Router()
const user = require('../models/user')
const { alertmove } = require('../utill/alert.js')
const userRouter = require('./user')
const boardRouter = require('./board')

const Auth = (req,res,next)=>{
    let { user }=req.session //user level등급을 부여하면 등급별 권한을 조절할수있다.(응용방법)
    if(user != undefined){
       next()
    }else{
        res.send(alertmove('/','회원만 가능한 기능입니다'))
    }
}
//Auth 미들웨어가 로그인 한사람/안한사람 구분해줍니다.

// user
router.use('/user',userRouter)

//board
router.use('/board',Auth,boardRouter)

router.get('/',(req,res)=>{
    const {user} = req.session
    res.render('index',{
        user
    })
})


module.exports = router