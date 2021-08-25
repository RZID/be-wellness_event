const responser = require("../helpers/responser");
const { validateToken } = require("../helpers/jwt");
module.exports = {
  unlogged: (req, res, next) => {
    if (req.headers.authorization)
      return responser.forbidden_403(
        res,
        "This route is intended for those who have not logged in"
      );

    return next();
  },
  logged: (req, res, next) => {
    if (!req.headers.authorization)
      return responser.unauthorized_401(
        res,
        "This route is intended for those who have logged in"
      );

    validateToken(req.headers.authorization.replace("Bearer ", ""))
      .then((response) => {
        req.userData = response;
        return next();
      })
      .catch(() =>
        responser.unauthorized_401(
          res,
          "Oops, token invalid. Please re-login to renew your token"
        )
      );
  },
  onlyVendor: (req, res, next) => {
    if (req.userData.role !== 1)
      return responser.forbidden_403(
        res,
        "This route is intended for vendor account only"
      );
    return next();
  },
  onlyHR: (req, res, next) => {
    if (req.userData.role !== 0)
      return responser.forbidden_403(
        res,
        "This route is intended for HR account only"
      );
    return next();
  }
};
