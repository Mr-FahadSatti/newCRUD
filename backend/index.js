const express = require('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const dotenv = require('dotenv')
const app = express()
const userRoute = require('./routes/userRoutes')
app.use(cors())
app.use(express.json())
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { MongoClient } = require('mongodb');


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

const uri = process.env.Mongo_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true }); //better support and compatibility with mongoDB server version , use new server discovered
cron.schedule('*/51 * * * * ', async function() {
    console.log("cron start");
    try {
        await client.connect();
        const db = client.db('crud');
        const collection = db.collection('lululemon');

        const today = new Date();
        console.log("Date today",today)

        const from = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0));
        //const localfrom = from.toLocaleString();
        console.log("date from",from)

        const to = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 8, 59, 59));
        //const localTo = to.toLocaleString();
        console.log("date to",to)

        const records = await collection.find({ createdAt: { $gte: from, $lte: to } }).toArray();
        console.log("Record",records)

        // const targetDate = new Date("2024-04-14T03:45:51.338+00:00");
        // const query = { createdAt: targetDate };
        // const records = await collection.find(query).toArray();
        //console.log("record : ",records)


        if (records.length === 0) {
            console.log("checked record length")
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_TO,
                subject: 'No Records Inserted',
                text: 'No records were inserted from midnight to 8:59 AM.'
            });
        } else {
            console.log("entered in else function")
            let allRecords = '';
            for (const record of records) {
                if (record.fileName.startsWith('stocks')) {
                    //allRecords += `${record.fileName}\n`;                 // get specific record
                    allRecords += `${JSON.stringify(record)}\n` + '\n';     //get all records 
                    console.log("allRecord :",allRecords)
                }
            }
            if (allRecords === '') {
                console.log("move to 1")
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_TO,
                    subject: 'sos not consumed',
                    text: 'No file start with "stocks".'
                });
            } else {
                console.log("move to 2")
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: process.env.EMAIL_TO,
                    subject: 'Files Inserted',
                    text: `Files inserted:\n${allRecords}`
                });
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
});




const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});





app.listen(process.env.PORT,()=>{
    connectDB()
    console.log('Server is running on Port ',process.env.PORT)
})