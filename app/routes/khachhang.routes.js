const { authJwt, verify } = require("../middlewares");
const controller = require("../controllers/khachhang.controller");
const db = require("../models");
const KhachHang = db.khachhang;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.put(
    "/api/khach-hang/tai-khoan",
    [authJwt.verifyToken],
    controller.updateCurrentKhachHang
  );

  app.get(
    "/api/khach-hang/tai-khoan",
    [authJwt.verifyToken],
    controller.getKhachHangById
  );

  app.get(
    "/api/khach-hang/danh-sach",
    [authJwt.verifyToken],
    controller.getAllKhachHang
  );

  app.post(
    "/api/khach-hang/them",
    [
      (req, res, next) =>
        verify.checkDuplicateUsernameOrEmail(req, res, next, KhachHang),
    ],
    [authJwt.verifyToken],
    controller.createKhachHang
  );

  app.put(
    "/api/khach-hang/sua",
    // [
    //   (req, res, next) =>
    //     verify.checkDuplicateUsernameOrEmail(req, res, next, KhachHang),
    // ],
    [authJwt.verifyToken],
    controller.updateKhachHang
  );

  app.delete(
    "/api/khach-hang/xoa",
    [authJwt.verifyToken],
    controller.deleteKhachHang
  );
};
