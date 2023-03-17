const express =require("express")
const auth = require("../middleware/auth")
// const mongoose = require("mongoose")
const UserModel = require("../models/userModel")
const FeedModel = require("../models/feedsModel")
const bcrypt = require("bcrypt")
const UserRouter = express.Router()

UserRouter.get("/admin/all",auth, async (req,res)=>{
    console.log(req.url);
    try{
        const users= await UserModel.find({})
        if(!users){
            return res.status(404).send("something went wrong")
        }
    
        res.send(users)
    }catch(e){
        res.status(404).send("something went Wrong! [userRouter Get All]")
    }
    
})

UserRouter.get("/me", auth, async (req,res)=>{
    res.send(req.user);
    
})

UserRouter.get("/admin/:id", auth, async (req,res)=>{
    console.log(req.url);
    try{
        const user= await UserModel.findById(req.params.id)
        if(!user){
          return res.status(404).send("user does not exists")
        }
        res.send(user)
    }catch(e){
        res.status(404).send("something went Wrong! [userRouter Get By ID]")
    }
    
})

UserRouter.post("/", async (req,res)=>{

    var user = req.body;
    if(user.password.lengh<=7){
        throw new Error({message:"minimum 8 characters"})
    }
    try{
        var hashedPassword = await bcrypt.hash(user.password ,8);
        user.password= hashedPassword;
        const newUser = new UserModel(user)
        const token= await newUser.getAuthenticationToken()
        // await newUser.save();
        res.send({newUser,token})
    }catch(e){
        res.status(404).send("something went Wrong! [userRouter Post]"+e);    
    }
})

UserRouter.post("/login", async (req,res)=>{
    try{
        const user= await UserModel.findByCredentials(req.body.email, req.body.password)
        const token = await user.getAuthenticationToken();
        if(!user){
            return res.status(404).send("something went wrong")
        }
    
        res.send({user,token})
    }catch(e){
        res.status(404).send("something went Wrong! [userRouter post login]"+ e)
    }
    
})

UserRouter.post("/logout",auth, async (req,res)=>{
    try{
        console.log("5 "+req.user);
        
        req.user.tokens = req.user.tokens.filter((token)=>{
            return req.token !== token.token
        })
        await req.user.save()
    
        res.send()
    }catch(e){
        res.status(500).send("something went Wrong! [userRouter post logout]"+ e)
    }
    
})

UserRouter.put("/me",auth, async (req,res)=>{
    try{
        const updates = Object.keys(req.body);
        console.log(updates.includes("password"))
        if(updates.includes("password")){
            var hashedPassword = await bcrypt.hash(req.body.password ,8);
            req.body.password= hashedPassword;
        }
        
        const user= await UserModel.findByIdAndUpdate(req.user.id,req.body,{new:true,runValidators:true})

        if(!user){
          return res.status(404).send("user does not exists")
        }
        
        res.send(user)
    }catch(e){
        res.status(404).send("something went Wrong! [userRouter PUT By ID]")
    }
    
})



UserRouter.delete("/me",auth, async (req,res)=>{
    try{
        const user= await UserModel.findByIdAndDelete(req.user._id)
        if(!user){
          return res.status(404).send("user does not exists")
        }
        res.send(user)
    }catch(e){
        res.status(404).send("something went Wrong! [userRouter Delete By ID]")
    }
    
})

UserRouter.get("/myfeeds",auth, async (req,res)=>{
      console.log();
      try{
        const feeds= await FeedModel.find({owner:req.user._id})
        res.send(feeds)
      }catch(e){
        res.status(401).send(e)
      }
})




module.exports = UserRouter


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEyNGNlYTNkNDA2Njc1YmE4NWM2YjIiLCJpYXQiOjE2Nzg5MjA5Mzh9.qT7K5yJXYdxrhUSvSY457gR0G3sIBc5v7WpA5bEBXNc


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEyNGNlYTNkNDA2Njc1YmE4NWM2YjIiLCJpYXQiOjE2Nzg5MjA5Mzh9.qT7K5yJXYdxrhUSvSY457gR0G3sIBc5...
