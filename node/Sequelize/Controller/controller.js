const db = require('../Models')

const Users = db.Users
const Profile = db.Profile
const Videos = db.Videos
const Images = db.Images
const comments = db.Comments
const Conversation = db.Conversation
const Message = db.Messages

const adduser = (req, res) => {

    let response = {
        data: 'ok'
    }
    res.status(200).json(response)
}

const insert = async (req, res) => {

    const body = req.body;
    const newUser = await Users.create(body, { isNewRecord: true })
    var profile = await Profile.create({ ...body, userId: newUser.id }) //i need this id

    const image = await Images.create({ ...body, ProfileId: profile.id })
    const commentImage = await comments.create({ ...body, commentable_id: image.id })

    const video = await Videos.create({ ...body, ProfileId: profile.id })
    const commentVideo = await comments.create({ ...body, commentable_id: video.id })

    return res.send({ newUser, profile, image, commentImage, commentVideo});

}


const startConve = async (req, res) => {
   
    const body = req.body;
    const profile = await Profile.scope('checkid').findOne({})
    const conversation = await Conversation.create({ ProfileId: profile.id }) //to here
    // const conversation = await Conversation.create({...body,ProfileId:1}) //to here
    // const messages = await Message.create({...body})
    return res.send({ profile, conversation })
}


const showall = async (req, res) => {
    const data = await Users.findAll({
        include:[{
            model:Profile,
            as:'Profile',
            include:[{
                model: Images,
                as:'images',
                include:{
                    model:comments,
                    as:'Comments'
                }
            }]
        }],
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
            as: 'Profile',
            include: [{
                model: Images,
                as: 'images',
                include: {
                    model: comments,
                    as: 'Comments'
                }
            }, {
                model: Videos,
                as: 'Videos',
                include: [{
                    model: comments,
                    as: 'Comments'
                }]
            }],

        }]

    })
    res.status(200).json(user)
}
const comment = async (req, res) => {
    const Comments = await comments.findAll({})
    res.send({ Comments })
}
const belongstomany = async (req, res) => {
    const user = await Users.findAll({
        include: [{
            model: Profile,
            // attributes: ['username', 'address', 'phone'],
            as: 'Profile'
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
const Comments = require('../Models/Comments')
const Video = require('../Models/Video')

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
                    include: {
                        model: comments,
                        foreignKey: 'commentable_id',
                        constraits: false,
                        as: 'Comments'
                    }
                }, {
                    model: Videos, as: 'Videos',
                    include: {
                        model: comments,
                        foreignKey: 'commentable_id',
                        constraits: false,
                        as: 'Comments'
                    }
                }
                ]
            }, {
                as: 'Profile'
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
    scopes,
    comment,
    startConve
}