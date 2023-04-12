const { verify } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const db = require("../models");
const NhanVien = db.nhanvien;
const KhachHang = db.khachhang

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  // Nhân viên auth
  app.post(
    "/api/nhanvien/signup",
    [
      (req, res, next) => verify.checkDuplicateUsernameOrEmail(req, res, next, NhanVien)
    ],
    controller.signupNhanVien
  );

  app.post("/api/nhanvien/signin", controller.signinNhanVien);

  // Khách hàng auth
  app.post(
    "/api/khachhang/signup",
    [
      (req, res, next) => verify.checkDuplicateUsernameOrEmail(req, res, next, KhachHang)
    ],
    controller.signupKhachHang
  );

  app.post("/api/khachhang/signin", controller.signinKhachHang);

  // Chung
  
  app.post("/api/auth/signout", controller.signout);
};