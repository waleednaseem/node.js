var express=require('express');
var router=express.Router();
const uuid=require('uuid');
let apiusers=require('./apiusers');

router.get('/',(req,res)=>{
    res.json(apiusers)
});

router.get('/:id',(req,res)=>{
    const found= apiusers.some(user => user.id ===parseInt(req.params.id))
    {found? res.json(apiusers.filter(user => user.id === parseInt(req.params.id))):
    res.sendStatus(400)
    }
})
router.post('/',(req,res)=>{
    const newUser={
        id: uuid.v4(),
        name: req.body.name,
        email:req.body.email
    }
    {!newUser.name || !newUser.email ? res.sendStatus(400):
    apiusers.push(newUser)
    res.json(apiusers)
    }
})
router.put('/:id',(req,res)=>{
    // const updateUser= req.body;
   const found = apiusers.some(user => user.id === parseInt(req.params.id))
   if(found){
    apiusers.forEach(user => {
        if(user.id === parseInt(req.params.id)){
            user.name = req.body.name ? req.body.name : user.name 
            user.email= req.body.email?req.body.email: user.email
            res.json({msg: 'user updated',user})
        }
        
    })
   }
})
router.delete('/:id',(req,res)=>{
    const found= apiusers.some(user => user.id == parseInt(req.params.id))
    if(found){
        users=apiusers.filter(user =>user.id !== parseInt(req.params.id))
        res.json({msg:'deleted',users})
    } else{
        res.sendStatus(400)
    }
})
module.exports=router