const db = require('../Models')

const Users = db.Users
const Profile = db.Profile
// const post = db.Post
const Videos = db.Videos
const Images = db.Images
const comments = db.Comments

const adduser = (req, res) => {

    let response = {
        data: 'ok'
    }
    res.status(200).json(response)
}
const insert = async (req, res) => {
    try {
        const body = req.body;
        const newUser = await Users.create(body, { isNewRecord: true });
        const profile = await Profile.create({ ...body, userId: newUser.id });
        const image = await Images.create({...body, ProfileId:profile.id})
        return res.send({ newUser, profile, image });

    } catch (ex) {
        return res.status(500).send(ex)
    }
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
            as: 'Profile',
            include: [{
                model: Images,
                as: 'images'
            }]
        }]
        // attributes: ['id', 'name'],
        // where: { id: 1 }
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
    scopes
}