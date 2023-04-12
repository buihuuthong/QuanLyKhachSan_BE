const { authJwt, verify } = require("../middlewares");
const controller = require("../controllers/nhanvien.controller");
const db = require("../models");
const NhanVien = db.nhanvien;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get(
    "/api/nhan-vien/tai-khoan",
    [authJwt.verifyToken],
    controller.getCurrentNhanVien
  );

  app.put(
    "/api/nhan-vien/tai-khoan",
    [authJwt.verifyToken],
    controller.updateCurrentNhanVien
  );

  app.get(
    "/api/nhan-vien/danh-sach",
    [authJwt.verifyToken],
    controller.getAllNhanVien
  );

  app.post(
    "/api/nhan-vien/them",
    [
      (req, res, next) =>
        verify.checkDuplicateUsernameOrEmail(req, res, next, NhanVien),
    ],
    [authJwt.verifyToken],
    controller.createNhanVien
  );

  app.put(
    "/api/nhan-vien/sua",
    [
      (req, res, next) =>
        verify.checkDuplicateUsernameOrEmail(req, res, next, NhanVien),
    ],
    [authJwt.verifyToken],
    controller.updateNhanVien
  );

  app.delete(
    "/api/nhan-vien/xoa",
    [authJwt.verifyToken],
    controller.deleteNhanVien
  );
};
