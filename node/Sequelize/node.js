const express=require('express')
const App = express()
const port = 8080
const jwt = require('jsonwebtoken')

const ctrl =require('./Controller/controller')
const db = require('./Models/index')

function VerifyToken(req, res, next){
    const barrerheader = req.headers['authorization']
    if(typeof barrerheader !== 'undefined'){
        const bearrerToken= barrerheader.split(' ')[1]
        req.token = bearrerToken
        next()
    }else{
        res.sendStatus(403)
    }
}
// App.get('/',(req,res)=>{
//     res.send('hellow')
// })
App.get('/add',ctrl.adduser)
App.get('/insert',ctrl.insert)
App.get('/show',ctrl.showall)
App.get('/one',ctrl.hasonetoone)
App.get('/many',ctrl.belongstomany)
App.get('/post',ctrl.fromPost)
App.get('/api/login',ctrl.Login)
App.get('/ApiPost',VerifyToken,ctrl.ApiPost)
App.get('/scope',ctrl.scopes)

// App.get('/api/logins', async(req, res) => {
    // const user = {
    //     name: 'waleed',
    //     password:'password'
    // }

    // jwt.sign({ user: user }, 'secretkey', (err, token) => {
    //      res.json({
    //         token
    //     })
    //     res.send(err)
    // })
//     const username= 'waleed'
//     const password= 'password'
//     const sql= await `SELECT * FROM users WHERE name='${username}' AND password='${password}'`
//     db.sequelize.query(sql,(err,login)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.send('you are logged in',login)
//         }
        
//     })
// })


App.listen(port,console.log(`server is running on port ${port}`))