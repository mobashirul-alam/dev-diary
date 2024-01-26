import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Mongodb is connected");
    })
    .catch((err) => {
        console.log(err);
    });
const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error!";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
