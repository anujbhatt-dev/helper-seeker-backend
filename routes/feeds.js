const express = require("express");
const auth = require("../middleware/auth");
const FeedModel = require("../models/feedsModel");
const FeedsModel = require("../models/feedsModel");
const UserModel = require("../models/userModel");
const FeedsRouter = express.Router();

FeedsRouter.get("/", async (req,res)=>{
    try{
        const feeds= await FeedsModel.find({})
        if(!feeds){
            return res.status(404).send("something went wrong")
        }
        res.send(feeds)
    }catch(e){
        res.status(404).send("something went Wrong! [FeedRouter Get All]")
    }
    
})

FeedsRouter.get("/:id",auth, async (req,res)=>{
    try{
        
        const feed= await FeedsModel.findById(req.params.id)
        if(!feed){
          return res.status(404).send("feed does not exists")
        }
        res.send(feed)
    }catch(e){
        res.status(404).send("something went Wrong! [FeedRouter Get By ID]")
    }
    
})

FeedsRouter.post("/",auth , async (req,res)=>{

    try{
        const feed = {...req.body,owner:req.user._id};
        const newFeed = await FeedModel(feed);
        await newFeed.save();
        res.send(newFeed)
    }catch(e){
        console.log(e)
        res.status(404).send("something went Wrong! [FeedRouter Post]"+ e);    
    }
})

FeedsRouter.put("/:id", async (req,res)=>{
    
    try{
        
        const feed= await FeedsModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!feed){
          return res.status(404).send("feed does not exists")
        }
        res.send(feed)
    }catch(e){
        res.status(404).send("something went Wrong! [FeedRouter PUT By ID]")
    }
    
})

FeedsRouter.delete("/:id", async (req,res)=>{
    try{
        
        const feed= await FeedsModel.findByIdAndDelete(req.params.id)
        if(!feed){
          return res.status(404).send("feed does not exists")
        }
        res.send(feed)
    }catch(e){
        res.status(404).send("something went Wrong! [FeedRouter Delete By ID]")
    }
    
})




module.exports = FeedsRouter