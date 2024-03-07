import express from "express";
import { getVerifyCodeController, loginController, getUserInfoController, userLogoutController } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get('/getVerifyCode', getVerifyCodeController)
authRouter.post('/login', loginController)
authRouter.get('/getUserInfo', getUserInfoController)
authRouter.post('/userLogout', userLogoutController)

export default authRouter;