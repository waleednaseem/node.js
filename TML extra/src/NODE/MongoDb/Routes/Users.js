const express =require('express')
const router=express.Router()
const userCtrl=require('../Controllers')


router.post('/Register',userCtrl.CreateUser)
router.post('/login',userCtrl.Login)
router.post('/location',userCtrl.findCountry)
router.post('/insertdata',userCtrl.insertData)
router.post('/SearchByConsignee',userCtrl.searchConsignee)
router.post('/history',userCtrl.history)
router.post('/data',userCtrl.data)
// router.post('/update', userCtrl.updateUser)

module.exports= router;