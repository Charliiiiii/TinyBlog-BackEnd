import { verifyTokenAndGetUserId } from "./common.js"
import db from "../tools/db.js"
import jwt from "jsonwebtoken";
import config from "../config.js"
import { getUserInfoController } from "./auth.js";

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

        db.query(updateSql, [title, content, cover_url, category, descripition, uid, id], (err, result) => {
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

export const getAriticleListController = (req, res) => {

  let category = req.query.category;
  let searchSql = "SELECT * FROM articles";
  let params = []
  if (category) {
    searchSql += " WHERE category = ?"
    params.push(category)
  }
  db.query(searchSql, params, (err, result) => {
    if (err) {
      res.json({
        code: 500,
        msg: "查询失败"
      })
      return
    }
    res.json(
      {
        code: 200,
        msg: "查询成功",
        data: result
      }
    )
  })
}


export const getAriticleController = (req, res) => {
  console.log(req)
  let token = req.cookies.access_token
  jwt.verify(token, config.jwtkey, (err, result) => {
    if (err) {
      res.json({
        code: 500,
        msg: "查询失败"
      })
    }
    let uid = result.id;

    const getUsersArticleSql = "SELECT a.title, a.id, a.content, a.cover_url, a.category, u.username FROM articles a JOIN users u ON a.uid = u.id WHERE a.uid = ?";

    db.query(getUsersArticleSql, [uid], (err, result) => {
      if (err) {
        res.json({
          code: 500,
          msg: "数据库查询失败"
        })
      }
      res.json({
        code: 200,
        msg: "查询成功",
        data: result
      })
    })
  })



}

export const updateArticleController = (req, res) => {
  const id = req.params.id;
  console.log(id)
  const getArticleInfoSql = "SELECT * FROM articles WHERE id = ?"
  db.query(getArticleInfoSql, [id], (err, result) => {
    if (err) {
      res.json({
        code: 500,
        msg: "查询失败！"
      })
    }
    res.json({
      code: 200,
      msg: "文章信息查询成功！",
      data: result
    })
  })


}

export const deleteArticleController = (req, res) => {
  const articleId = req.params.articleId;

  const deleteArticleSql = "DELETE FROM articles WHERE id = ?"

  db.query(deleteArticleSql, [articleId], (err, result) => {
    if (err) {
      res.json({
        code: 500,
        msg: "删除失败"
      })
    }
    res.json({
      code: 200,
      msg: "删除成功！"
    })
  })
}

export const getCayegoryAriticle = (req, res) => {

}