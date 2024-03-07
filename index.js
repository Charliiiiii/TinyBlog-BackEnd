import express from "express";
import authRouter from "./routers/auth.js";
import cookieParser from "cookie-parser";
import articleRouter from "./routers/article.js";
import commonRouter from "./routers/common.js";
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRouter);
app.use('/api/article', articleRouter);
app.use('/api/common', commonRouter)
app.use('/storage', express.static('storage'))
app.listen("8800", () => {
  console.log("connected!")
})