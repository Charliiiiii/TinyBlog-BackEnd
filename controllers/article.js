import { verifyTokenAndGetUserId } from "./common.js"
import db from "../tools/db.js"

export const postAriticleController = async (req, res) => {

  const uid = await verifyTokenAndGetUserId(req, res);
  if (!uid) return;

  const {
    title,
    content,
    cover_url,
    category,
    descripition,
    id
  } = req.body

  //检查必填参数是否为空
  if (!title || !content) {
    res.json({
      code: 400,
      msg: "标题或内容不能为空！"
    })
    return;
  }

  //先判断id是否存在
  new Promise((resolve, reject) => {
    if (id) {
      let querySql = "SELECT * FROM articles WHERE id = ?"

      db.query(querySql, [id], (err, result) => {
        if (err) {
          console.log(err)
          reject("数据库错误！")
        }
        if (result.length === 0) {
          reject("文章不存在")
        }
        if (result[0]?.uid !== uid) {
          reject("没有权限")
        }
        resolve();
      })
    } else {
      resolve();
    }
  }).then(() => {
    return new Promise((resolve, reject) => {
      if (id) {
        const updateSql = "Update articles SET title = ?, content = ?, cover_url = ?, category = ?, description = ?, uid = ?  WHERE id = ?"

        db.query(updateSql, [title, content, cover_url, category, descripition, uid], (err, result) => {
          if (err) {
            console.log(err)
            reject("数据库错误！")
          }
          resolve(id)
        })
      } else {
        const insertSql = "INSERT INTO articles (`title`,`content`, `cover_url`, `category`, `description`,`uid`) VALUES (?) "

        db.query(insertSql, [[title, content, cover_url, category, descripition, uid]], (err, result) => {
          if (err) {
            console.log(err)
            reject("数据库错误！")
          }
          console.log(result)
          resolve(result.insertId)
        })
      }
    })
  }).then((articleId) => {
    res.json({
      code: 200,
      msg: `${id ? "更新" : "发布"}成功`,
      data: {
        id: articleId
      }
    })
  }).catch((err) => {
    res.json({
      code: 400,
      msg: err
    })
  })
}