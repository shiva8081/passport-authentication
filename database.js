import mongoose from "mongoose";


export const connectTomongoDB= async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/passport")
        console.log("mongoDB connectTomongoDB")
    } catch (error) {
        console.log("error connecting to mongoDB",error.messages)
    }
}