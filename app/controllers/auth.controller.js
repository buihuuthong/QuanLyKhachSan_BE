const db = require("../models");
const config = require("../config/auth.config");
const NhanVien = db.nhanvien;
const KhachHang = db.khachhang;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Nhân viên
exports.signupNhanVien = (req, res) => {
  const ngaySinh = new Date(req.body.NgaySinh);

  NhanVien.create({
    TaiKhoan: req.body.TaiKhoan,
    MatKhau: bcrypt.hashSync(req.body.MatKhau, 8),
    HoTen: req.body.HoTen,
    NgaySinh: ngaySinh,
    DiaChi: req.body.DiaChi,
    SDT: req.body.SDT,
    Email: req.body.Email,
    MaChucVu: req.body.MaChucVu,
  })
    .then(() => {
      res.status(201).send({ message: "Đăng ký nhân viên thành công!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signinNhanVien = (req, res) => {
  NhanVien.findOne({
    where: {
      TaiKhoan: req.body.TaiKhoan,
    },
  })
    .then((nhanvien) => {
      if (!nhanvien) {
        return res.status(404).send({ message: "Không tìm thấy tài khoản!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.MatKhau,
        nhanvien.MatKhau
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Sai mật khẩu!",
        });
      }

      var token = jwt.sign({ id: nhanvien.MaNhanVien }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      req.session.token = token;

      res.status(200).send({
        id: nhanvien.MaNhanVien,
        taikhoan: nhanvien.TaiKhoan,
        hoten: nhanvien.HoTen,
        ngaysinh: nhanvien.NgaySinh,
        diachi: nhanvien.DiaChi,
        sdt: nhanvien.SDT,
        email: nhanvien.Email,
        chucvu: nhanvien.MaChucVu,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Khách hàng
exports.signupKhachHang = (req, res) => {
  const ngaySinh = new Date(req.body.NgaySinh);

  KhachHang.create({
    TaiKhoan: req.body.TaiKhoan,
    MatKhau: bcrypt.hashSync(req.body.MatKhau, 8),
    HoTen: req.body.HoTen,
    NgaySinh: ngaySinh,
    DiaChi: req.body.DiaChi,
    SDT: req.body.SDT,
    Email: req.body.Email,
  })
    .then(() => {
      res.status(201).send({ message: "Đăng ký người dùng thành công!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signinKhachHang = (req, res, user) => {
  console.log(user);
  KhachHang.findOne({
    where: {
      TaiKhoan: req.body.TaiKhoan,
    },
  })
    .then((khachhang) => {
      if (!khachhang) {
        return res.status(404).send({ message: "Không tìm thấy tài khoản!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.MatKhau,
        khachhang.MatKhau
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Sai mật khẩu!",
        });
      }

      var token = jwt.sign({ id: khachhang.MaKhachHang }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      req.session.token = token;

      res.status(200).send({
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
      res.status(500).send({ message: err.message });
    });
};

// Chung
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    next(err);
  }
};

// Lấy dữ liệu người dùng khi đăng nhập bằng google
exports.getUserGoogle = (req, res) => {
  try {
    const userData = req.session.user;

    req.session.token = userData.accessToken;

    res.status(200).send({
      MaKhachHang: userData.MaKhachHang,
      TaiKhoan: userData.TaiKhoan,
      HoTen: userData.HoTen,
      NgaySinh: userData.NgaySinh,
      DiaChi: userData.DiaChi,
      SDT: userData.SDT,
      Email: userData.Email,
      accessToken: userData.accessToken,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
