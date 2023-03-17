const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    description:{
        type:String,
        required:true
    },
    createdat:{
        type:Date,
        default:Date.now,
        required:true
    },
    updatedat:{
        type:Date
    },
    interested:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User'
    },
    selected:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    

})

const FeedModel=mongoose.model("Feed",FeedSchema);

module.exports = FeedModel;