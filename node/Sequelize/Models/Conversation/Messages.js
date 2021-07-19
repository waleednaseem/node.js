module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
        from:{
            type:DataTypes.INTEGER
        },
        to:{
            type:DataTypes.INTEGER
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Messages
}