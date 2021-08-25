const bcrypt = require("bcrypt");
const { hash_salt } = require("./env").app;
module.exports = {
  makePassword: (text) =>
    new Promise((resolve, reject) => {
      bcrypt.genSalt(hash_salt, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(text, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    }),
  verifyPassword: (plain, hash) =>
    new Promise((resolve, reject) => {
      bcrypt.compare(plain, hash, (err, result) => {
        if (err || !result) reject(err);
        resolve(true);
      });
    })
};
