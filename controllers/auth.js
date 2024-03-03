import express from "express";
import cache from "../tools/cache.js";

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

