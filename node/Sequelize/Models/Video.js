module.exports=(sequelize,DataTypes)=>{
    const Video = sequelize.define('video',{
        video_name:{
            type: DataTypes.STRING
        },
        video_origin:{
            type: DataTypes.STRING
        },
        // ProfileId:{
        //     allowNull:false,
        //     type:DataTypes.INTEGER
        // }
    })
    return Video
}