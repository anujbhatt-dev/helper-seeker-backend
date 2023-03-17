const mongoose = require('mongoose');
const connectDb =async ()=>{
    try{

        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/HelperSeaker')

        console.log(conn.connection.port);
    }catch(e){
        console.log(e);
    }


}

module.exports=connectDb