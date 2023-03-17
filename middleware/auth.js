const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken")

const auth = async (req,res,next)=>{
        try{
                const token = req.header("Authorization").replace("Bearer ","");
                const decode= jwt.verify(token,"HelperSeeker")
                const user = await UserModel.findOne({_id:decode._id , "tokens.token":token})
                // console.log(req);
                if(!user){
                        throw new Error();
                }
                if(req.baseUrl.slice(0,6)=="/admin" && decode.usertype!="admin"){
                        throw new Error("not eligible")
                }

                req.token = token;
                req.user= user;
                next();
        } catch(e){
                res.status(401).send("please authenticate"+ e);
        }
}

module.exports=auth