const responser = require("../helpers/responser");
const model = require("../models/user");
const { verifyPassword } = require("../helpers/password");
const { makeToken } = require("../helpers/jwt");
module.exports = {
  login: async (req, res) => {
    if (!req.body.username || !req.body.password) {
      responser.badRequest_400(res, "Username & password is required!");
    } else {
      const userData = await model.findOne({ username: req.body.username });
      if (!userData)
        return responser.notFound_404(
          res,
          "Oops, username is not registered in our system"
        );

      try {
        await verifyPassword(req.body.password, userData.password);
      } catch (e) {
        return responser.forbidden_403(
          res,
          "Oops, the password you entered is wrong!"
        );
      }
      const userDataToken = {
        _id: userData._id,
        name: userData.name,
        username: userData.username,
        company: userData.company
      };
      const token = `Bearer ${await makeToken({
        ...userDataToken,
        role: userData.role
      })}`;
      return responser.ok_200(res, "Success login", {
        token,
        userData: userDataToken
      });
    }
  },
  vendors: async (req, res) => {
    const data = await model.find({
      role: 1,
      $or: [
        { name: { $regex: ".*" + req.query.where + ".*" } },
        { company: { $regex: ".*" + req.query.where + ".*" } }
      ]
    });
    return responser.ok_200(res, "Success get vendors", data);
  }
};
