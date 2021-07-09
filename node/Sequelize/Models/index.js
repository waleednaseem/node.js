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
db.Post = require('./Post')(sequelize, DataTypes)


db.Users.hasOne(db.Profile, { foreignKey: 'userId', as: 'postDetails' })
db.Profile.belongsTo(db.Users, { foreignKey: 'userId' })

db.Profile.belongsToMany(db.Users, { through: 'post', as: 'user_post' })
db.Users.belongsToMany(db.Profile, { through: 'post', as: 'User_Profile' })

db.Profile.addScope('checkid', {
    where: {
        userId: 2
    }
})
db.Videos = require('./Video')(sequelize, DataTypes)
db.Images = require('./Image')(sequelize, DataTypes)
db.Comments = require('./Comments')(sequelize, DataTypes)

db.Profile.hasMany(db.Images,{
     foreignKey: 'ProfileId',
      constraits: false,
       as: 'Images' 
    })
db.Profile.hasMany(db.Videos,{
    foreignKey:'ProfileId',
    constraits:false,
    as:'Videos'
})
db.Images.belongsTo(db.Profile,{foreignKey: 'commentable_id'})

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

module.exports = db