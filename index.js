import express from "express";
import authRouter from "./routers/auth.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRouter);


app.listen("8800", () => {
  console.log("connected!")
})