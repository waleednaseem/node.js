const express = require('express')
const App = express()
const port = 8080
const api = require('./api')
const uuid = require('uuid')

App.use(express.json())
App.use(express.urlencoded({ extended: false }))

App.get('/', (req, res) => {
    res.json(api)
})

App.post('/', (req, res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        address: req.body.address
    }
    if (!newUser.name || !newUser.address) {
        res.sendStatus(400)
    }
    api.push(newUser)
    res.json(api)
})
// update
App.put('/:name',(req,res)=>{
    const found =api.filter(x => x.name === req.params.name)
    if(found){
        api.forEach(x =>{
            if(x.name === req.params.name){
                x.name = req.body.name ? req.body.name : x.name
                x.address= req.body.address ? req.body.address : x.address
                res.json({msg: 'updated user',api})
            }
        })
    }
})
//  search user
App.get('/:name',(req,res)=>{
    const found = api.filter(x => x.name === req.params.name)
    if(found){
        res.json( api.filter(x => x.name === req.params.name))
    }else{
        res.sendStatus(404)
    }
})
//  deleting user
App.delete('/:name',(req,res)=>{
    const found = api.some(x => x.name === req.params.name)
    if(found){
        deleted = api.filter(x => x.name !== req.params.name)
        res.json({msg:'record is delete',deleted})
    }
})
App.listen(port, console.log(`running Port is ${port}`))
