import express from "express";
import { postAriticleController } from "../controllers/article.js";
const articleRouter = express.Router();

articleRouter.post("/", postAriticleController);
export default articleRouter;