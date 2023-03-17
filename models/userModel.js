const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
        fullname:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        
        },
        whatsappno:{
            type:Number,
            required:true,
            validate: {
                validator: function(v) {
                  return v.toString().length===10;
                },
                message: props => `${props.value} is not a valid phone number!`
              },
        },
        gender:{
            type:String,
            enum:["male","female","other"],
            required:true
        },
        age:{
            type:Number,
            required:true,
            validate: {
                validator: function(v) {
                  return (v>=18)
                },
                message:`Not Eligible`
              },
        },
        email:{
            type:String,
            unique:true,
            required:true,
        },
        joindate:{
            type:Date,
            default:Date.now 
        },
        usertype:{
            type:String,
            enum:["seeker","helper","admin"],
            required:true

        },
        feeds:{
            type:[mongoose.Schema.Types.ObjectId],

        },
        tokens:[{
            token:{
                type:String,
                required:true
            }
        }]
})



UserSchema.methods.getAuthenticationToken= async function(){
    const user= this
    console.log(user);
    console.log("user before");
    const token = jwt.sign({_id:user._id.toString(),usertype:user.usertype},"HelperSeeker")
    user.tokens=  user.tokens.concat({token})
    await user.save()
    console.log("user after");
    return token

}

UserSchema.statics.findByCredentials = async (email,password) =>{
        console.log("[IN Credentials]");
        const user= await UserModel.findOne({email})
        if(!user){
            throw new Error("unable to login")
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            throw new Error("unable to login")
        }

        return user
}


const UserModel=mongoose.model("User",UserSchema);

module.exports = UserModel;