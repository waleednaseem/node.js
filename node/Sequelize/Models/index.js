const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('waleeddb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
})

sequelize.authenticate()
    .then(res => console.log('connected'))
    .catch(err => console.log('your error is ', err))

const db = {}
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.sequelize.sync({ force: false })
    .then(res => console.log('Re syncronizing'))
    .catch(err => console.log(err))

db.Users = require('./User')(sequelize, DataTypes)
db.Profile = require('./Profile')(sequelize, DataTypes)


db.Users.hasOne(db.Profile, { foreignKey: 'userId',allowNull:false, as: 'Profile' })
db.Profile.belongsTo(db.Users, { foreignKey: 'userId', allowNull:false })

// db.Profile.addScope('checkid', {
//     where: {
//         username: "waleed"
//     }
// })
db.Videos = require('./Video')(sequelize, DataTypes)
db.Images = require('./Image')(sequelize, DataTypes)
db.Comments = require('./Comments')(sequelize, DataTypes)

db.Profile.hasMany(db.Images,{
     foreignKey: 'ProfileId',
       as: 'images' 
    })
db.Profile.hasMany(db.Videos,{
    foreignKey:'ProfileId',
    constraits:false,
    as:'Videos'
})
db.Images.belongsTo(db.Profile,{foreignKey: 'ProfileId',as:'Profile'})

db.Images.hasMany(db.Comments, {
    foreignKey: 'commentable_id',
    constraits: false,
    scope: {
        comments_Type: 'image'
    },
    as:'Comments'
})
db.Videos.hasMany(db.Comments, {
    foreignKey: 'commentable_id',
    constraits: false,
    scope: {
        comments_Type: 'video'
    },
    as:'Comments'
})
db.Comments.belongsTo(db.Images,{foreignKey: 'commentable_id',constraits: false})
db.Comments.belongsTo(db.Videos,{foreignKey: 'commentable_id',constraits: false})

db.Conversation = require('./Conversation/Conversation')(sequelize,DataTypes)
db.Messages = require('./Conversation/Messages')(sequelize,DataTypes)

// db.Profile.belongsToMany(db.Messages,{through:{foreignKey:'MessageId',model:db.Conversation}})
// db.Messages.belongsToMany(db.Profile,{through:{foreignKey:'ProfileId',model:db.Conversation}})
db.Profile.hasMany(db.Conversation)
db.Conversation.hasMany(db.Messages)

db.Conversation.belongsTo(db.Profile)
db.Messages.belongsTo(db.Conversation)

module.exports = db