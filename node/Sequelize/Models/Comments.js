module.exports=(sequelize,DataTypes)=>{
    const comments = sequelize.define('comments',{
        comment:{
            type: DataTypes.STRING
        },
        // commentable_id:{
        //     type:DataTypes.INTEGER
        // },
        comments_Type:{
            type:DataTypes.STRING
        }
    })
    return comments
}