const express = require("express");
const AdminModel = require("../models/adminModel")
const AdminRouter = express.Router();

AdminRouter.get("/",async (req,res)=>{
    const admin = new AdminModel({
        adminName:"admin",
        password:"fdsf",
    })
    await admin.save();

    res.send("Admin Route")
    console.log("i am in admin route");
})

module.exports = AdminRouter