const express = require('express')
const router = express.Router()
const user = require('../../models/user')
const { alertmove } = require('../../utill/alert.js')

//user

router.get('/login',(req,res)=>{
    res.render('user/login')
})

router.post('/login',(req,res)=>{
    let {userid,userpw} = req.body
    let [item] = user.filter(v=>(v.userid == userid && v.userpw == userpw))
    //위 코드의 목적:
    //사용자에게 받은정보를 서버에있는 리스트중에서 하나만 가져오기위해서.
    //filter() = forEach()
    if(item != undefined){
        //로그인 할수있는경우
        req.session.user={ ...item }
        res.redirect('/')
    }else{
        //로그인 못하는경우
        res.send(alertmove('/user/login','아이디와 패스워드가 일치하지않습니다'))
    }
})

router.get('/profile',(req,res)=>{
    res.render('user/profile')
})

router.get('/logout',(req,res)=>{
    req.session.destroy( ()=>{
        req.session
    } )
    res.send(alertmove('/','로그아웃이 완료되었습니다.'))
})

module.exports = router

