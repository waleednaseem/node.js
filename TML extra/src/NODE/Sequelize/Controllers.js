const db = require('./Model')
const jwt = require('jsonwebtoken')
// const iplocate = require("node-iplocate");
const geoip = require('geoip-lite')
const ip = require('ip')
const dbip = require('dbip')
// const dataInsert = require('./Model/dataInsert')



const User = db.User
const userData = db.userData

const makeUser = async (req, res) => {
    const credentials = { Username: req.body.Username }
    const user = { Username: req.body.Username, Password: req.body.Password }
    const findUser=  await User.findOne({where:credentials})
    if(!findUser){
        await User.create(user)
        res.send('User Created')
    }else{
        res.send('User Found')
    }
}
const updateUser =async(req,res)=>{
    const credentials = { Username: req.body.Username }
    const user = { Username: req.body.Username, Password: req.body.Password }
    const findUser=  await User.findOne({where:credentials})
    if(findUser){
        await User.update(user,{where:credentials})
        res.send('User Updated')
    }else{
        res.send('User not Found')
    }
}
const Login = async (req, res) => {
    const credentials = { Username: req.body.Username, Password: req.body.Password }
    const login = await User.findOne({ where: credentials })

    if (login) {
        jwt.sign({ user: login }, 'secretKey', (err, token) => {

            res.status(200).json({ msg: 'Logged in', token, login })
        })

    }
    else {
        res.json({ msg: 'Wrong credentials ' })
    }
}
const findCountry = async (req, res) => {
    const ip = req.body.ipAddr
    // const findLocation = geoip.lookup(`${ip}`)
    const findLocation = await dbip(`${ip}`)
    // console.log(findLocation)
    res.send(findLocation)
}
const insertData = async (req, res) => {


    const data = {
        order_from_country: req.body.order_from_country,
        Username: req.body.Username,
        shipName: req.body.shipName,
        shipAddr: req.body.shipAddr,
        shipTell: req.body.shipTell,
        shipEmail: req.body.shipEmail,
        shipPic: req.body.shipPic,
        consName: req.body.consName,
        consAddr: req.body.consAddr,
        consTell: req.body.consTell,
        consEmail: req.body.consEmail,
        consPic: req.body.consPic,
        competition: req.body.competition,
        volume: req.body.volume,
        port_of_loading: req.body.port_of_loading,
        port_of_discharge: req.body.port_of_discharge,
        final_destination: req.body.final_destination,
        comodities: req.body.comodities,
        freight_term: req.body.freight_term,
        remark: req.body.remark,
        dataID: req.body.dataID
    }
    const Cdata = {
        // order_from_country: req.body.order_from_country,
        shipAddr: req.body.shipAddr,
        shipTell: req.body.shipTell,
        shipEmail: req.body.shipEmail,
        shipPic: req.body.shipPic,
        consAddr: req.body.consAddr,
        consTell: req.body.consTell,
        consEmail: req.body.consEmail,
        consPic: req.body.consPic,
        competition: req.body.competition,
        volume: req.body.volume,
        port_of_loading: req.body.port_of_loading,
        port_of_discharge: req.body.port_of_discharge,
        final_destination: req.body.final_destination,
        comodities: req.body.comodities,
        freight_term: req.body.freight_term,
        remark: req.body.remark,
    }

    console.log(Cdata);

    const insertDatas = await userData.findOne({ where: Cdata })

    if (insertDatas) {
        res.json(`Data is already inserted from ${insertDatas.Username} ${insertDatas.order_from_country} at ${insertDatas.createdAt}`)
    } else {
        await userData.create(data)
        res.status(200).json({ msg: 'Data inserted', data })
    }
    // res.send(insertDatas)
}
// const userinfo = await User.findOne({where:{id:req.body.id}})
const history = async (req, res) => {
    const admin = await User.findOne({ where: { Username: req.body.Username },order: [['createdAt', 'DESC']] })
    const adminRole = await userData.findAll({order: [['createdAt', 'DESC']]})
    const userRole = await userData.findAll({ where: { Username: req.body.Username },order: [['createdAt', 'DESC']] })
    
    admin.Username === 'admin' ? res.json(adminRole) : res.json(userRole)
}
// const AllData = async (req, res) => {
//     const data = await userData.findAll({})
//     res.send(data)
// }
const searchConsignee = async (req, res) => {
    const data = await userData.findAll({ where: { consName: req.body.consName } })
    res.send(data)
}
module.exports = {
    makeUser,
    Login,
    insertData,
    findCountry,
    updateUser,
    searchConsignee,
    history
}