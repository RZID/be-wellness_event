const { getById, confirm, create } = require("../controllers/eventController");
const { logged, onlyVendor, onlyHR } = require("../middlewares/auth");
module.exports = (app) => {
  app.get("/api/event", logged, getById);
  app.post("/api/event/:id", logged, onlyVendor, confirm);
  app.post("/api/event", logged, onlyHR, create);
};
