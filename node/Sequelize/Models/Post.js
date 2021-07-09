module.exports=(sequelize,DataTypes)=>{
   const Post= sequelize.define('post',{
        userId: DataTypes.INTEGER,
        ProfileId: DataTypes.INTEGER,
        // id: DataTypes.INTEGER,
    });
    return Post
}
