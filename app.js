import express from "express";     
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";


// app
export const app = express();

config({
    path: "./data/config.env",
});

// using middlewares -->

app.use(cookieParser());
app.use(express.json());
app.use("/users",userRouter);
app.use("/tasks",taskRouter);


app.get("/", (req, res) => {
    res.send("Root is working.....");
});


app.use(errorMiddleware);



