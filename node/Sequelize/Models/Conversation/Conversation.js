module.exports=(sequelize,DataTypes)=>{
    const Conversation = sequelize.define('Conversation',{
        from:{
            type:DataTypes.INTEGER
        },
        to:{
            type:DataTypes.INTEGER
        },
        inbox_id:{
            type:DataTypes.INTEGER
        }
    })
    return Conversation
}