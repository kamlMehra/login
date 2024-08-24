import dotenv from "dotenv";

dotenv.config();

import bodyParser from "body-parser";

import express from "express";

import cors from "cors";

import mongoose from "mongoose";

import routes from "./routes/Login.routes.js";

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL).then((result)=>{
  console.log("Connected to MongoDB", result.connection.host);
})
.catch((err)=>{
  console.log(err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use('/api',routes)