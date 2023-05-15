const { verify } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const db = require("../models");
const NhanVien = db.nhanvien;
const KhachHang = db.khachhang;
const passport = require("passport");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Nhân viên auth
  app.post(
    "/api/nhanvien/signup",
    [
      (req, res, next) =>
        verify.checkDuplicateUsernameOrEmail(req, res, next, NhanVien),
    ],
    controller.signupNhanVien
  );

  app.post("/api/nhanvien/signin", controller.signinNhanVien);

  // Khách hàng auth
  app.post(
    "/api/khachhang/signup",
    [
      (req, res, next) =>
        verify.checkDuplicateUsernameOrEmail(req, res, next, KhachHang),
    ],
    controller.signupKhachHang
  );

  app.post("/api/khachhang/signin", controller.signinKhachHang);

  // Chung

  app.post("/api/auth/signout", controller.signout);

  app.get("/google", passport.authenticate("google", ["profile", "email"]));

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: process.env.CLIENT_URL,
      failureRedirect: "api/login/failed",
    })
  );

  app.get("/api/auth/google/user", controller.getUserGoogle)

  app.get("api/login/failed", (req, res) => {
    res.status(401).json({
      error: true,
      message: "Log in failure",
    });
  });
};
