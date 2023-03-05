import express from "express";
import  mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import conversationRouter from "./routes/conversation.route.js";
import gigRouter from "./routes/gig.route.js";
import messageRouter from "./routes/message.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/review.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

mongoose.set('strictQuery', true);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDb!")
    } catch (error) {
        handleError(error);
    }
};
//middlewares
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Credentials", true);
//     next();
// })
app.use(express.json());
const CLIENT_URL = process.env.CLIENT_URL

app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/conversations", conversationRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/messages", messageRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"

    return res.status(errorStatus).send(errorMessage);
});


app.listen(process.env.PORT || 8500, () => {
    connect();
    console.log("Backend server is running!");
});

