const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        // validate: {
        //     validator: function(v) {
        //         return /\S+@\S+\.\S+/.test(v); // Check if email contains @ symbol
        //     },
        //     message: props => `${props.value} is not a valid email address!`
        // }
      
    },
    password:{
        type:String,
        
    }
})

module.exports= mongoose.model("CrudUser",userSchema)