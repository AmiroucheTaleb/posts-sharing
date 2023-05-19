import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dbConnect from "./config/db.js";
import path from "path";
import router from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import * as env from "dotenv";
import cors from "cors";
env.config();
const app = express();

// connect mongodb database
dbConnect();
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);
app.use("/postes", postRoutes);
app.use("/profile", profileRoutes);
const PORT = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log("Your app is running");
  });
});
