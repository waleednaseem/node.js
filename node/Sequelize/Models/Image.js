module.exports=(sequelize,DataTypes)=>{
    const images = sequelize.define('image',{
        image_name:{
            type:DataTypes.STRING
        },
        image_url:{
            type:DataTypes.STRING
        },
        ProfileId:{
            allowNull:false,
            type:DataTypes.INTEGER
        }
    })
    return images
}