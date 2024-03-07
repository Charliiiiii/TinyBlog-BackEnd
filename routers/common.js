import express from "express";
import { uploadFileController } from "../controllers/common.js";
import multer from "multer";
import config from "../config.js";


//存上传的照片
const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, config.uploadFileRoute)
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`)
  }
});
const commonRouter = express.Router()
const uploadMulter = multer({
  storage: storage
})

commonRouter.post('/uploadFile', uploadMulter.single("file"), uploadFileController)
export default commonRouter;