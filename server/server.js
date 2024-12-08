import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

cors({
  origin: process.env.CLIENT_URL,
  methods: ["POST,PUT,DELETE", "GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongooDB is Connected"))
  .catch((e) => console.log(e));

app.use((err, req, res) => {
  console.log(err.stack);
  res.status(500).json({ success: false, message: "Something went Wrong" });
});

app.listen(PORT, () => {
  console.log(`server is Running on port ${PORT}`);
});
