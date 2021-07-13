module.exports=(sequelize,DataTypes)=>{
    const Profile =sequelize.define('Profile',{
        username: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.INTEGER,
    });
    return Profile
}