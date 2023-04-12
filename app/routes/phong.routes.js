const { authJwt } = require("../middlewares");
const controller = require("../controllers/phong.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/phong/danh-sach-phong",
    [authJwt.verifyToken],
    controller.getAllPhong
  );

  app.post(
    "/api/phong/tao-phong",
    [authJwt.verifyToken],
    controller.createPhong
  );

  app.put(
    "/api/phong/sua-phong",
    [authJwt.verifyToken],
    controller.updatePhong
  );

  app.delete(
    "/api/phong/xoa-phong",
    [authJwt.verifyToken],
    controller.deletePhong
  );
};