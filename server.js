const express= require("express");
const app=express();
const mongoose=require("mongoose");
const userRouter=require("./route/user");

mongoose.connect("mongodb://localhost:27017/interview").then(()=>{    
    console.log("Connected to database");
}).catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/user",userRouter);

app.get("/",(req,res)=>{
    res.send("Hello World");
})



app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})