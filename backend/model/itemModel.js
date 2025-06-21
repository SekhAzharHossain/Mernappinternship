import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    itemType:{
        type:String,
        enum:['Shirt','Pant','Shoes','Sports Gear','Other'],
        required:true
    },
    itemDescription:{
        type:String,
        required:true
    },
    itemCoverImage:{
        type:String,
        required:true
    },
    itemAdditionalImages:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export default mongoose.model("Item",itemSchema)