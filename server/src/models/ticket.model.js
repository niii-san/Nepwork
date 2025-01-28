import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        title: {
            type : String ,
            required : true , 
        },
        description: {
             type: String, required: true 
            },
        createdBy : {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
            required: true 
        },
        status: {
             type: String, 
             enum: ["open", "closed", "resolved"],
            default: "open" 
        },

        replies : [
            {
                message: { 
                    type: String,
                    required: true
                },
                timestamp: { 
                    type: Date, 
                    default: Date.now 
                },
            }
        ],
}, 
{timestamps :true}
)

export const Ticket = mongoose.model("Ticket", ticketSchema);