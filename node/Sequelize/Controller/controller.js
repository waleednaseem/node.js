const db = require('../Models')

const Users = db.Users
const Profile = db.Profile
const post = db.Post
const Videos = db.Videos
const Images = db.Images
const comments = db.Comments

const adduser = (req, res) => {

    let response = {
        data: 'ok'
    }
    res.status(200).json(response)
}
const insert = (req, res) => {
    // Users.create({
    //     name: 'waleed',
    //     password: 'password',
    //     // userId:1

    // }).catch(err => {
    //     if (err) {
    //         console.log(err)
    //     }
    // })
    // Profile.create({
    //     username: 'ali',
    //     address: '5a4 madiha stop',
    //     phone: 21534215,
    //     userId: 1,
        // ProfileId:1
    // })
    // post.create({
    //     userId: 3,
    //     ProfileId: 3
    // }).catch(err => {
    //     if (err) {
    //         console.log(err)
    //     }
    // })
    // Images.create({
    //     image_name:'waleed.jpg',
    //     image_url:'/waleed.jpg',
    //     ProfileId:1
    // }).catch(err => console.log(err))

    // Videos.create({
    //     video_name: 'aliVideo',
    //     video_origin: 'from Ali',
    //     ProfileId: 1
    // }).catch(err => console.log(err))

    // comments.create({
    //     comment:'video is for first id',
    //     commentable_id:1,
    //     comments_Type:'video'
    // })
    res.send('inserted')
}


const showall = async (req, res) => {
    const data = await Users.findAll({
        attributes: ['id', 'name']
    })
    const response = {
        data
    }
    res.status(200).json(response)
}
const hasonetoone = async (req, res) => {
    const user = await Users.findAll({
        include: [{
            model: Profile,
            attributes: ['username', 'address', 'phone'],
            as: 'postDetails'
        }],
        attributes: ['id', 'name'],
        where: { id: 1 }
    })
    // const resp={
    //     data:user
    // }
    res.status(200).json(user)
}
const belongstomany = async (req, res) => {
    const user = await Users.findAll({
        include: [{
            model: Profile,
            attributes: ['username', 'address', 'phone'],
            as: 'User_Profile'
        }],
        attributes: ['name'],
        where: { id: 1 }
    })
    res.status(200).json(user)
}
const fromPost = async (req, res) => {
    const Post = await Profile.findAll({
        include: [{
            model: Users,
            as: 'user_post'
        }]
    })
    res.status(200).json(Post)
}
const jwt = require('jsonwebtoken')

const Login = async (req, res) => {
    const credentials = { name: 'ali', password: 'password' }
    const login = await Users.findOne({ where: credentials })

    if (login) {
        jwt.sign({ user: credentials }, 'secretkey', (err, token) => {
            res.json({
                token
            })
        })
    }
    else {
        res.send('wrong credentials')
    }
}

const ApiPost = (req, res, next) => {
    jwt.verify(req.token, 'secretkey', async (err) => {
        if (err) {
            res.sendStatus(404)
        } else {
            const data = await Profile.findOne({
                include: [{
                    model: Images, as: 'Images',
                    include:{
                        model:comments,
                        foreignKey: 'commentable_id',
                        constraits: false,
                        as:'Comments'
                    }
                }, {
                    model: Videos, as: 'Videos',
                    include:{
                        model:comments,
                        foreignKey: 'commentable_id',
                        constraits: false,
                        as:'Comments'
                    }
                    }
                ]
            })
            res.json({
                msg: 'Login sucessfully',
                data
            })
        }
    })
}
const scopes = async (req, res) => {
    const data = await comments.findAll({
        include: [Images, Videos]
    })
    res.status(200).json(data)
}
module.exports = {
    adduser,
    insert,
    showall,
    hasonetoone,
    belongstomany,
    fromPost,
    Login,
    ApiPost,
    scopes
}