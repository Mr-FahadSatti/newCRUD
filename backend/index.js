const express = require('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const dotenv = require('dotenv')
const app = express()
const userRoute = require('./routes/userRoutes')
app.use(cors())
app.use(express.json())


const connectDB = async ()=>{
    try{
        mongoose.connect(process.env.Mongo_URL)
        console.log('Database connected succssfuly')
    }
    catch(error)
    {
        console.log("Error..",error)
    }
}

dotenv.config()
app.use('/user',userRoute)

app.listen(process.env.PORT,()=>{
    connectDB()
    console.log('Server is running on Port ',process.env.PORT)
})