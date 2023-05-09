const { authJwt } = require("../middlewares");
const controller = require("../controllers/service.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/services/phu-thu",
    [authJwt.verifyToken],
    controller.createPhuThu
  );

  app.get(
    "/api/services/phu-thu",
    [authJwt.verifyToken],
    controller.getPhuThuById
  );

  app.put(
    "/api/services/phu-thu",
    [authJwt.verifyToken],
    controller.updatePhuThu
  );

  app.get(
    "/api/services/tinh-trang-phong",
    [authJwt.verifyToken],
    controller.getDanhSachTinhTrangPhong
  );

  app.get(
    "/api/services/trang-thai-dat",
    [authJwt.verifyToken],
    controller.getDanhSachTrangThaiDat
  );
};