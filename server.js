import express from "express";
import { connectTomongoDB } from "./database.js";
import User from "./schema.js";
import ejs from "ejs"

const app=express();
app.use(express.json()); // to parse the incoming request with json payload (from req.body)
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/register",async(req,res)=>{
    const user =await User.find({username:req.body.username});
    if(user) return res.status(404).send("user alredy exist");
    const newuser = await User.create(req.body);
    res.status(201).send(newuser);


})



app.listen(4000,async(req,res)=>{
    await connectTomongoDB();
    // await User.create({username:"shiva",password:"asyudc"});
    console.log("listening on port 4000")
})