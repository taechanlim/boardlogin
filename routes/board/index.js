const express = require('express')
const router = express.Router()
const user = require('../../models/user')
const { alertmove } = require('../../utill/alert.js')
const dataList = require('../../models/list.js')
const list = [...dataList.data]


// board
router.get('/list',(req,res)=>{
    res.render('board/list',{
        content:list,
    })
})

router.get('/write',(req,res)=>{
    res.render('board/write')
})

router.post('/write',(req,res)=>{
    let board = {...req.body}
    list.push(board)
    res.send(alertmove('/board/list','글 작성이 완료되었습니다.'))
})

router.get('/view',(req,res)=>{
    const index = req.query.index
    const view = list[index-1]
    res.render('board/view',{
        list:view,
        index:index,
    })
})


router.post('/delete',(req,res)=>{
    const index = req.body.index-1
    list.splice(index,1)
    res.send(alertmove('/board/list','글 삭제가 완료되었습니다.'))
})

router.get('/update', (req,res)=>{
    const index = req.query.index
    const view = list[index-1]
    res.render('board/update',{
        list:view,
        index:index
    })
})


router.post('/update',(req,res)=>{
    const index = req.body.index
    const item = {
        subject:req.body.subject,
        username:req.body.username,
        text:req.body.text,
        date:req.body.date,
    }
    list[index-1] = item
    res.send(alertmove(`/board/view?index=${index}`,'글 수정이 완료되었습니다.'))
})

module.exports = router