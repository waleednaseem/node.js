module.exports=(sequelize,DataTypes)=>{
   const User = sequelize.define('users',{
        name: {
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING
        }
    });
    return User
}