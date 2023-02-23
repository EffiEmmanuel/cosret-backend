// @ts-nocheck
//
// effiemmanueln
import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err) => {
      console.log("An error occured while connecting to the database:", err);
    });
};
