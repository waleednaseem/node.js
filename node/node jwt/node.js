const express = require('express')
const App = express()
const jwt = require('jsonwebtoken')
const port = 8080

App.post('/api/post', VerifyToken, (req, res) => {
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(404)
        }else{
            res.json({
                msg: 'Post created',
                authData
            })
        }
    })
})
App.post('/api/login', (req, res) => {
    const user = {
        name: 'waleed'
    }
    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
})

function VerifyToken(req, res, next) {
    const barrerheader = req.headers['authorization']
    if(typeof barrerheader !== 'undefined'){
        const bearrerToken= barrerheader.split(' ')[1]
        req.token = bearrerToken
        next()
    }else{
        res.sendStatus(403)
    }
}
App.listen(port, console.log(`server is running on ${port}`))