import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import { Email } from './models/Email'

dotenv.config()
const app = express()
const Port = process.env.PORT

const mongoUrl = process?.env?.MONGO_URL

// connect to mongo db
if(!mongoUrl)
    {console.log("error")}
else{
    mongoose.connect(mongoUrl)
    mongoose.connection.on("connected",()=>console.log("connected to mongo db"))
    mongoose.connection.on("error",(err)=>console.log(`errors: ${err}`))
}

// middleware
app.use(express.json())
app.use(cors())

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    });

app.get('/',(req, res)=>{
    res.send('hell world')
})

// send email
app.post('/:email',async(req, res)=>{

    try {
        const email = req.params.email
        const {receiverEmail, text, subject} = req.body

        if (!email || !receiverEmail || !text || !subject) {
            return res.status(400).json({ error: "Missing required field" });
        }

        const info = await transporter.sendMail({
            from: email, // sender address
            to: receiverEmail, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: `<b>${text}</b>`, // html body
        });

        const saveEmail = await Email.create({email, receiverEmail, subject, text})
        
        res.status(200).json(saveEmail)
    } catch (error) {
        res.status(500).json(error)
    }
    
    
})

// get by email
app.get('/user/:email', async(req, res) => {
    const email = req.params.email
    if(!email){
        res.status(400).json({ error: "Missing required field" });
    }else{
        try {
            const emails = await Email.find({ email: email}) 
            res.status(200).json(emails);
        } catch (error) {
            res.status(500).json(error);
        }
    }
})

// get specific email
app.get('/:id', async(req, res) => {
    try {
        const email = await Email.findById(req.params.id);
        res.status(200).json(email)
    } catch (error) {
        res.status(500).json(error)
    }
})

app.listen(Port, ()=>{
    console.log(`listening on port http://localhost:${Port}` )
})