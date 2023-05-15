const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const config = require("../config/auth.config");
const db = require("../models");
const KhachHang = db.khachhang;
const controller = require("../controllers/auth.controller");

const jwt = require("jsonwebtoken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (req, accessToken, refreshToken, profile, callback) {
      const email = profile.emails[0].value;
      console.log("email", email);

      KhachHang.findOne({
        where: {
          Email: email,
        },
      })
        .then((khachhang) => {
          if (khachhang) {
            var token = jwt.sign({ id: khachhang.MaKhachHang }, config.secret, {
              expiresIn: 86400, // 24 hours
            });

            if (req && req.session) {
              req.session.token = token;
            }

            callback(null, {
              MaKhachHang: khachhang.MaKhachHang,
              TaiKhoan: khachhang.TaiKhoan,
              HoTen: khachhang.HoTen,
              NgaySinh: khachhang.NgaySinh,
              DiaChi: khachhang.DiaChi,
              SDT: khachhang.SDT,
              Email: khachhang.Email,
              accessToken: token,
            });
          } else {
            const ngaySinh = new Date();

            KhachHang.create({
              TaiKhoan: email,
              MatKhau: "",
              HoTen: profile.displayName,
              NgaySinh: ngaySinh,
              DiaChi: "",
              SDT: "",
              Email: email,
            })
              .then((khachhang) => {
                var token = jwt.sign(
                  { id: khachhang.MaKhachHang },
                  config.secret,
                  {
                    expiresIn: 86400, // 24 hours
                  }
                );

                if (req && req.session) {
                  req.session.token = token;
                  req.session.user = khachhang?.dataValues;
                }

                callback(null, {
                  MaKhachHang: khachhang.MaKhachHang,
                  TaiKhoan: khachhang.TaiKhoan,
                  HoTen: khachhang.HoTen,
                  NgaySinh: khachhang.NgaySinh,
                  DiaChi: khachhang.DiaChi,
                  SDT: khachhang.SDT,
                  Email: khachhang.Email,
                  accessToken: token,
                });
              })
              .catch((err) => {
                callback(err, null);
              });
          }
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  )
);

passport.serializeUser((req, user, done) => {
  req.session.user = user;
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
