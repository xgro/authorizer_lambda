"use strict";
const jwt = require('jsonwebtoken');

module.exports.handler = async (event) => {
  const {loginname, password} = JSON.parse(event.body)
  if(loginname == '김코딩' && password == '1234'){
    const token = jwt.sign({"id": 1234 , "loginname": '김코딩', "name": '김코더', "role": '관리자'}, process.env.JWT_SECRET)
    return { token }
  } else {
    return { 
      statusCode: 400,
      body: JSON.stringify({
        message: "유효한 로그인네임과 패스워드가 아닙니다.",
        input: event,
      })
    }
  }
};