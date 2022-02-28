module.exports = (Connection,DataTypes)=>{
    const User =  Connection.define('User',{
        Username:{
            type: DataTypes.STRING,
            allowNull:false
        },
        Password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        Country:{
            type: DataTypes.STRING,
            allowNull: true
        }
    })
    return User
}