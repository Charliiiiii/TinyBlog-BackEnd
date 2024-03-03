import express from "express";
import { getVerifyCodeController, loginController } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get('/getVerifyCode', getVerifyCodeController)
authRouter.post('/login', loginController)

export default authRouter;