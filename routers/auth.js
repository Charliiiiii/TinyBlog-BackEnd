import express from "express";
import { registerController } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.get('/register', registerController)

export default authRouter;