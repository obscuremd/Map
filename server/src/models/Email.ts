import mongoose, { model, models } from "mongoose";

const EmailSchema = new mongoose.Schema({
    email:{type:String, required:true},
    receiverEmail:{type:String, required:true},
    subject:{type:String, required:true},
    text:{type:String, required:true}
},{timestamps:true})

export const Email = mongoose.model('Email', EmailSchema) || models.Email