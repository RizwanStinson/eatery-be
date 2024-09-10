import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

async function connectMongoose() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}

export default connectMongoose;
