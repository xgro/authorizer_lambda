"use strict";
const jwt = require('jsonwebtoken');

const splitByDelimiter = (data, delim) => {
  const pos = data ? data.indexOf(delim) : -1;
  return pos > 0 ? [data.substr(0, pos), data.substr(pos + 1)] : ["", ""];
};


module.exports.handler = async (event) => {
  // console.log(event.headers.authorization)
  const [type, token] = splitByDelimiter(event.headers.authorization, " ");
  const allow = type === "Bearer" && !!jwt.verify(token, process.env.JWT_SECRET);
  // console.log(allow)
  const policy = {
    principalId: "*",
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: allow ? "Allow" : "Deny",
          Resource: "*",
        },
      ],
    },
  };
  // console.log(policy)
  return policy;
};