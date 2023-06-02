import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log('Action...')
  if (!process.env.JWT_KEY) {
    throw new Error("env not define");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-service:27017/auth");
    console.log("Connected to mogoDB");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Auth service listen on port 3000");
  });
};



start();
