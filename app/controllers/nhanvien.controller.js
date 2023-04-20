const db = require("../models");
const NhanVien = db.nhanvien;
const ChucVu = db.chucvu;
const bcrypt = require("bcryptjs");
const { getPagination, getPagingData } = require("../middlewares/pagination");

// Cập nhật thông tin nhân viên hiện tại
exports.updateCurrentNhanVien = (req, res) => {
  const ngaySinh = new Date(req.body.NgaySinh);
  NhanVien.update(
    {
      TaiKhoan: req.body.TaiKhoan,
      MatKhau: bcrypt.hashSync(req.body.MatKhau, 8),
      HoTen: req.body.HoTen,
      NgaySinh: ngaySinh,
      DiaChi: req.body.DiaChi,
      SDT: req.body.SDT,
      Email: req.body.Email,
      MaChucVu: req.body.MaChucVu,
    },
    {
      where: {
        MaNhanVien: req.userId,
      },
    }
  )
    .then((result) => {
      if (result[0] === 0) {
        return res.status(404).send({ message: "Không tìm thấy nhân viên." });
      }
      res.send({ message: "Cập nhật tài khoản thành công." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy danh sách nhân viên
exports.getAllNhanVien = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  NhanVien.findAndCountAll({
    include: [
      {
        model: ChucVu,
        as: "ChucVu",
      },
    ],
    limit,
    offset,
  })
    .then((nhanvien) => {
      const response = getPagingData(nhanvien, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy nhân viên by id
exports.getNhanVienById = (req, res) => {
  const id = req.query.id;
  NhanVien.findOne({
    include: [
      {
        model: ChucVu,
        as: "ChucVu",
      },
    ],
    where: { MaNhanVien: id },
  })
    .then((nhanvien) => {
      if (!nhanvien) {
        return res.status(404).send({ message: "Không có nhân viên" });
      }
      res.send(nhanvien);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Thêm nhân viên
exports.createNhanVien = (req, res) => {
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
      res.status(201).send({ message: "Thêm nhân viên thành công!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Cập nhật thông tin nhân viên
exports.updateNhanVien = (req, res) => {
  const id = req.query.id;
  const ngaySinh = new Date(req.body.NgaySinh);
  NhanVien.update(
    {
      TaiKhoan: req.body.TaiKhoan,
      MatKhau: bcrypt.hashSync(req.body.MatKhau, 8),
      HoTen: req.body.HoTen,
      NgaySinh: ngaySinh,
      DiaChi: req.body.DiaChi,
      SDT: req.body.SDT,
      Email: req.body.Email,
      MaChucVu: req.body.MaChucVu,
    },
    { where: { MaNhanVien: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cập nhật thông tin thành công.",
        });
      } else {
        res.send({
          message: `Không thể cập nhật thông tin. Nhân viên có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi cập nhật thông tin ${err}`,
      });
    });
};

// Xóa nhân viên
exports.deleteNhanVien = (req, res) => {
  const id = req.query.id; // assuming you pass the id of the room in the request URL
  NhanVien.destroy({
    where: { MaNhanVien: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Xóa nhân viên thành công.",
        });
      } else {
        res.send({
          message: `Không thể xóa nhân viên. Nhân viên có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi xóa nhân viên`,
      });
    });
};
