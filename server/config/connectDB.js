import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide MONGODB_URI in the .env file"
    )
}

async function connectDB(){
    try {
          console.log("Connecting to MongoDB..."); // ✅ Safer log message
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB")
    } catch (error) {
        console.log("Mongodb connect error",error)
        process.exit(1)
    }
}

export default connectDB