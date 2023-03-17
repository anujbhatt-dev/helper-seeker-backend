const express= require("express");
const app = express()
const PORT= 3001

const auth = require("./middleware/auth")



app.use(express.json());

const connectDb = require('./db/db');
connectDb()
// require("./Models/adminModel");

// const AdminRouter = require("./Routes/admin");
const UserRouter = require("./routes/user")
const FeedsRouter = require("./routes/feeds")

// app.use("/admin",AdminRouter);
app.use("/api/user",UserRouter);
app.use("/api/feeds",FeedsRouter);

app.listen(PORT,(e)=>{
    console.log(`listening to port ${PORT}`);
})

