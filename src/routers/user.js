const { login, vendors } = require("../controllers/userController");
const { logged, unlogged, onlyHR } = require("../middlewares/auth");
module.exports = (app) => {
  app.post("/api/login", unlogged, login);
  app.get("/api/vendor", logged, onlyHR, vendors);
};
