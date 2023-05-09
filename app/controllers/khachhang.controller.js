const db = require("../models");
const KhachHang = db.khachhang;
const bcrypt = require("bcryptjs");
const { getPagination, getPagingData } = require("../middlewares/pagination");

// Đếm số lượng khách hàng
exports.countKhachHang = (req, res) => {
  KhachHang.count()
    .then((count) => {
      res.json({ count });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Cập nhật thông tin khách hàng hiện tại
exports.updateCurrentKhachHang = (req, res) => {
  const ngaySinh = new Date(req.body.NgaySinh);
  KhachHang.update(
    {
      HoTen: req.body.HoTen,
      NgaySinh: ngaySinh,
      DiaChi: req.body.DiaChi,
      SDT: req.body.SDT,
      Email: req.body.Email,
    },
    {
      where: {
        MaKhachHang: req.body.MaKhachHang,
      },
    }
  )
    .then((result) => {
      if (result[0] === 0) {
        return res.status(404).send({ message: "Không tìm thấy khách hàng." });
      }
      res.send({ message: "Cập nhật tài khoản thành công." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy danh sách khách hàng
exports.getAllKhachHang = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  KhachHang.findAndCountAll({
    limit,
    offset
  })
    .then((khachhang) => {
      const response = getPagingData(khachhang, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Thêm khách hàng
exports.createKhachHang = (req, res) => {
  const ngaySinh = new Date(req.body.NgaySinh ?? '1991-01-01');

  KhachHang.create({
    TaiKhoan: req.body.TaiKhoan ?? null,
    MatKhau: bcrypt.hashSync(req.body.MatKhau ?? '0000', 8),
    HoTen: req.body.HoTen ?? null,
    NgaySinh: ngaySinh,
    DiaChi: req.body.DiaChi ?? null,
    SDT: req.body.SDT ?? null,
    Email: req.body.Email ?? null,
  })
    .then(() => {
      res.status(201).send({ message: "Thêm khách hàng thành công!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy khách hàng by id
exports.getKhachHangById = (req, res) => {
  const id = req.query.id;
  KhachHang.findOne({ where: { MaKhachHang: id } })
    .then((khachhang) => {
      if (!khachhang) {
        return res.status(404).send({ message: "Không có khách hàng" });
      }
      res.send(khachhang);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Cập nhật thông tin khách hàng
exports.updateKhachHang = (req, res) => {
  const id = req.query.id;
  const ngaySinh = new Date(req.body.NgaySinh);
  KhachHang.update(
    {
      HoTen: req.body.HoTen,
      NgaySinh: ngaySinh,
      Email: req.body.Email,
      DiaChi: req.body.DiaChi,
      SDT: req.body.SDT,
    },
    { where: { MaKhachHang: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cập nhật thông tin thành công.",
        });
      } else {
        res.send({
          message: `Không thể cập nhật thông tin. khách hàng có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi cập nhật thông tin ${err}`,
      });
    });
};

// Xóa khách hàng
exports.deleteKhachHang = (req, res) => {
  const id = req.query.id; // assuming you pass the id of the room in the request URL
  KhachHang.destroy({
    where: { MaKhachHang: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Xóa khách hàng thành công.",
        });
      } else {
        res.send({
          message: `Không thể xóa khách hàng. khách hàng có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi xóa khách hàng`,
      });
    });
};
