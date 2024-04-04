const mongoose = require('mongoose')

const bookSchema= mongoose.Schema({
    bookname: {
        type: String
    },
    author: {
        type: String
    },
    user_email:
    {
        type:String
    }
});

module.exports=mongoose.model("Book",bookSchema)