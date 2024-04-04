const mongoose = require('mongoose')

const detailSchema= mongoose.Schema({
    age:{
        type: String
    },
    city: {
        type: String
    },
    user_email:{
        type:String
    }
})

module.exports=mongoose.model("detail",detailSchema)