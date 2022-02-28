const mongoose = require('mongoose')

const UserData= new mongoose.Schema({
    order_from_country:{
        type: String,
        require:true,
        max:20,
    },
    Username:{
        type: String,
        require:true,
        max:20,
    },
    shipName:{
        type: String,
        require:true,
        max:20,
    },
    shipAddr:{
        type: String,
        require:true,
        max:20,
    },
    shipTell:{
        type: String,
        require:true,
        max:20,
    },
    shipEmail:{
        type: String,
        require:true,
        max:20,
    },
    shipPic:{
        type: String,
        require:true,
        max:20,
    },
    consName:{
        type: String,
        require:true,
        max:20,
    },
    consAddr:{
        type: String,
        require:true,
        max:20,
    },
    consTell:{
        type: String,
        require:true,
        max:20,
    },
    consEmail:{
        type: String,
        require:true,
        max:20,
    },
    consPic:{
        type: String,
        require:true,
        max:20,
    },
    competition:{
        type: String,
        require:true,
        max:20,
    },
    volume:{
        type: String,
        require:true,
        max:20,
    },
    port_of_loading:{
        type: String,
        require:true,
        max:20,
    },
    port_of_discharge:{
        type: String,
        require:true,
        max:20,
    },
    final_destination:{
        type: String,
        require:true,
        max:20,
    },
    comodities:{
        type: String,
        require:true,
        max:20,
    },
    freight_term:{
        type: String,
        require:true,
        max:20,
    },
    remark:{
        type: String,
        require:true,
        max:20,
    },
    // dataID:{
    //     type: String,
    //     require:true,
    //     max:20,
    // },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"users"
    }
    
    
},{
    timestamps:true
})

module.exports= mongoose.model('Data',UserData)