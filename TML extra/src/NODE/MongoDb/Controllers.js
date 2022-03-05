const User = require('./Models/User')
const UserData = require('./Models/UserData')
const jwt = require('jsonwebtoken')
const dbip = require('dbip')


const CreateUser = async (req, res) => {
    const userFind = await User.findOne({ Username: req.body.Username })
    const username = req.body.Username
    const password = req.body.password
    if (!userFind) {
        const userLogin = await User.create({
            Username: req.body.Username,
            password: req.body.password
        })
        await userLogin.save()
        res.json({ msg: 'User created Succesfully', userLogin })
    } else {
        res.json('User is already registered')
    }

}
const Login = async (req, res) => {
    const FindUser = await User.findOne({ Username: req.body.Username, password: req.body.password })

    // await res.send(FindUser)
    if (FindUser) {
        // const dataid= FindUser._id
        await jwt.sign({ user: FindUser }, 'secretKey', (err, token) => {
            res.status(200).json({ msg: 'Logged in', token, FindUser })
        })
        // await FindUser.Data.push(UserData.user.objectid)
        const datas = await UserData.find({ User: FindUser._id })
        // console.log(datas[0]._id)
        await FindUser.Data.push({ data: datas })
    }
    else {
        res.json({ msg: 'Wrong credentials' })
    }

}
const updateUser = async (req, res) => {
    const credentials = { Username: req.body.Username }
    const pass = { password: req.body.password }
    // const user = { Username: req.body.Username, password: req.body.password }
    const findUser = await User.findOneAndUpdate(credentials,pass)
    if (findUser) {
        res.send('User Updated')
    } else {
        res.send('User not Found')
    }
}
const data = async (req, res) => {

    // const data = await User.find(UserData._id)
    // const every = await data({Data:[UserData._id]})
    // res.send(data)
}
const findCountry = async (req, res) => {
    const ip = req.body.ipAddr
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
        User: req.body.User
    }
    const Cdata = {
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

    // console.log(Cdata);

    const insertDatas = await UserData.findOne(Cdata)

    if (insertDatas) {
        res.json(`Data is already inserted from ${insertDatas.Username} ${insertDatas.order_from_country} at ${insertDatas.createdAt}`)
    } else {
        await UserData.create(data).then(res => User.findOneAndUpdate({ _id: res._id }, {
            $push: {
                Data: {
                    _id: res._id
                }
            }
        }))

        res.status(200).json({ msg: 'Data inserted', data })
    }
}
const history = async (req, res) => {
    const admin = await User.findOne({ Username: req.body.Username })
    const adminRole = await UserData.find()
    const userRole = await UserData.find({ Username: req.body.Username })

    admin.Username === 'admin' ? res.json(adminRole) : res.json(userRole)
}
const searchConsignee = async (req, res) => {
    const data = await UserData.find({ consName: req.body.consName })
    res.send(data)
}
// const updateUser =async(req,res)=>{
//     const credentials = { Username: req.body.Username }
//     const user = { Username: req.body.Username, Password: req.body.Password }
//     const findUser=  await User.findOne({where:credentials})
//     if(findUser){
//         await User.update(user,{where:credentials})
//         res.send('User Updated')
//     }else{
//         res.send('User not Found')
//     }
// }
module.exports = {
    CreateUser,
    Login,
    findCountry,
    insertData,
    history,
    searchConsignee,
    data,
    updateUser
}