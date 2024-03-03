import express from "express";
import { getVerifyCodeController } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get('/getVerifyCode', getVerifyCodeController)

export default authRouter;