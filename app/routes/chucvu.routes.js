const { authJwt } = require("../middlewares");
const controller = require("../controllers/chucvu.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/chuc-vu/danh-sach",
    [authJwt.verifyToken],
    controller.getAllChucVu
  );
};