import jwt from "jsonwebtoken";
import config from "../config.js"



//验证并获取uid
export const verifyTokenAndGetUserId = async (req, res) => {
  let token = req.cookies.access_token;

  if (!token) {
    res.json({
      code: 400,
      msg: "请登录后重试"
    })
    return null;
  }

  const id = await new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtkey, (err, userInfo) => {
      if (err) {
        res.json({
          code: 400,
          msg: "Token无效"
        })
        resolve(null)
      }
      resolve(userInfo.id)
    })
  })

  return id
}

export const uploadFileController = async (req, res) => {
  let file = req.file;

  if (!file) {
    res.json({
      code: 400,
      msg: "请先选择文件再上传"
    })
  }
  console.log(file.path)
  res.json({
    code: 200,
    msg: "上传成功",
    data: {
      url: file.path
    }
  })
}