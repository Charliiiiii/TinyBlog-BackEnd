import express from "express";
import {
  postAriticleController,
  getAriticleListController,
  getAriticleController,
  updateArticleController,
  deleteArticleController,
  getByKeywordController
} from "../controllers/article.js";

const articleRouter = express.Router();

articleRouter.post("/", postAriticleController);
articleRouter.get("/", getAriticleListController);
articleRouter.get("/:uid", getAriticleController);
articleRouter.get("/:id/article", updateArticleController);
articleRouter.post("/delete/:articleId", deleteArticleController);
articleRouter.get("/bykeyword/:keyword", getByKeywordController);
export default articleRouter;