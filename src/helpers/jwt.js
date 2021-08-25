const jwt = require("jsonwebtoken");
const { secret } = require("../helpers/env").jwt;

module.exports = {
  makeToken: (object) =>
    new Promise((resolve) => {
      const token = jwt.sign(object, secret);
      resolve(token);
    }),
  validateToken: (token) =>
    new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) reject(err);
        resolve(decoded);
      });
    })
};
