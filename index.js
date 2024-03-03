import express from "express";
import authRouter from "./routers/auth.js";

const app = express();


app.use('/api/auth', authRouter);

app.use(express.json());
app.listen("8800", () => {
  console.log("connected!")
})