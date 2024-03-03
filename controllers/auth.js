import express from "express";
import cache from "../tools/cache.js";
import db from "../tools/db.js";
import jwt from "jsonwebtoken";
import config from "../config.js"

//拿到验证码
export const getVerifyCodeController = (req, res) => {
  const { phone } = req.query || {};

  //判断手机号是否为空
  if (!phone) {
    res.status(400).json({
      code: 400,
      msg: "手机号不能为空"
    })

    return;
  }

  //判断手机号是否合法
  let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (!reg.test(phone)) {
    res.status(400).json({
      code: 400,
      msg: "手机号不合法"
    })
    return;
  }

  //生成验证码
  const verifyCode = Math.floor(1000 + Math.random() * 9000).toString();
  cache.setCache(`verify-code-${phone}`, verifyCode, 1000 * 60 * 5)

  //调用短信接口发送验证码
  res.json({
    code: 200,
    msg: "验证码发送成功！",
    data: {
      verifyCode: verifyCode
    }
  })
}

//登陆时验证验证码
export const loginController = (req, res) => {
  //获取前端发送的电话号码和验证码
  const { phone, verifyCode } = req.body || {};

  //验证是否为空
  if (!phone || !verifyCode) {
    res.json({
      code: 400,
      msg: "手机号或验证码不能为空"
    })
    return;
  }

  //获取验证码进行比对
  let correctVerifyCode = cache.getCache(`verify-code-${phone}`);
  if (!(correctVerifyCode === verifyCode)) {
    res.json({
      code: 400,
      msg: "验证码错误！"
    })
    return;
  }

  //查询数据库
  const queryFunc = (phone, resolve, reject) => {
    const querySql = "SELECT * FROM users WHERE phone = ?"
    db.query(querySql, [phone], (err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  }
  new Promise((resolve, reject) => {
    queryFunc(phone, resolve, reject);
  }).then((result) => {
    //用户不存在
    if (result.length === 0) {
      return new Promise((resolve, reject) => {
        const insertSql = "INSERT INTO users (`phone`,`username`) VALUES (?)"
        db.query(insertSql, [[phone, phone]], (err, result) => {
          if (err) {
            reject(err);
          }
          queryFunc(phone, resolve, reject);
        })
      })
    }
    //用户存在的情况
    return Promise.resolve(result);
  }).then((result) => {
    let userInfo = result[0]
    const { password, ...other } = userInfo;

    const token = jwt.sign(other, config.jwtkey)

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        code: 200,
        msg: "登陆成功！",
        data: other
      });
  })

}

