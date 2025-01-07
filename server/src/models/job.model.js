import mongoose from "mongoose";
import { User } from "./user.model";

const jobSchema = new mongoose.Schema(
    {
        title:{
            type :String ,
            required : true ,   
        },

        description:{
            type  :string ,
            required : true ,
        },

        client:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User" ,
            required : true     
           },

        freelancer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
           },

        appliedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],

        acceptedFreelancers :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },

        hourlyRate: {
            type: Number,
            required: true
        },
       
        skillsRequired: [{
            type: String,
            
        }],
        status: {
            type: String,
            enum: ["open", "in_progress", "completed", "cancelled", "closed"],
            default: "open",
        }

    },{timestamps:true});

    export const Job = mongoose.model("Job" , jobSchema); 