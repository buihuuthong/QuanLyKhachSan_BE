const { authJwt } = require("../middlewares");
const controller = require("../controllers/phong.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/phong/so-luong", [authJwt.verifyToken], controller.countPhong);

  app.get(
    "/api/phong/danh-sach-phong",
    // [authJwt.verifyToken],
    controller.getAllPhong
  );

  app.get(
    "/api/phong/thong-tin",
    // [authJwt.verifyToken],
    controller.getPhongById
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

  app.put("/api/phong/dat-phong", controller.bookPhong);

  app.delete(
    "/api/phong/xoa-phong",
    [authJwt.verifyToken],
    controller.deletePhong
  );
};
