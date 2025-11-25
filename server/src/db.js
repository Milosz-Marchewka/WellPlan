import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

export const connectDB = async () => {
  if(!cached){
    try {
      cached = await mongoose.connect(MONGO_URI);
      global.mongoose = cached;
      console.log("MongoDB connected");
      return cached;
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }
};