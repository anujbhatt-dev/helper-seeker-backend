const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
        adminName:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        joinDate:{
            type:Date,
            default:Date.now 
        }
})

const AdminModel=mongoose.model("admin",AdminSchema);

module.exports = AdminModel;