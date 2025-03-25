import extress from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";

import { connectDB } from "./lib/db.js";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // parse JSON request bodies

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});