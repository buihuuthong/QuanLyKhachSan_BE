const db = require("../models");
const DatPhong = db.datphong;
const { getPagination, getPagingData } = require("../middlewares/pagination");

// Lấy danh sách đặt phòng
exports.getAllDatPhong = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  DatPhong.findAndCountAll({
    limit,
    offset,
  })
    .then((datphong) => {
      const response = getPagingData(datphong, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy đơn đặt by id
exports.getDatPhongById = (req, res) => {
  const id = req.query.id;
  DatPhong.findOne({
    where: { MaDatPhong: id },
  })
    .then((datphong) => {
      if (!datphong) {
        return res.status(404).send({ message: "Không có đơn đặt" });
      }
      res.send(datphong);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Tạo đơn đặt phòng
exports.createDatPhong = (req, res) => {
  DatPhong.create({
    MaKhachHang: req.body.MaKhachHang,
    MaPhong: req.body.MaPhong,
    NgayTao: req.body.NgayTao,
    NgaySua: req.body.NgaySua,
    NgayNhan: req.body.NgayNhan,
    NgayTra: req.body.NgayTra,
    SoNgayThue: req.body.SoNgayThue,
    GiaThue: req.body.GiaThue,
    TongTien: req.body.TongTien,
    GhiChu: req.body.GhiChu,
    MaNhanVien: req.body.MaNhanVien,
    MaTrangThai: req.body.MaTrangThai,
  })
    .then(() => {
      res.status(201).send({ message: "Tạo đơn đặt phòng thành công!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Cập nhật đơn
exports.updateDatPhong = (req, res) => {
  const id = req.query.id;
  DatPhong.update(
    {
      MaKhachHang: req.body.MaKhachHang,
      MaPhong: req.body.MaPhong,
      NgayTao: req.body.NgayTao,
      NgaySua: req.body.NgaySua,
      NgayNhan: req.body.NgayNhan,
      NgayTra: req.body.NgayTra,
      SoNgayThue: req.body.SoNgayThue,
      GiaThue: req.body.GiaThue,
      TongTien: req.body.TongTien,
      GhiChu: req.body.GhiChu,
      MaNhanVien: req.body.MaNhanVien,
      MaTrangThai: req.body.MaTrangThai,
    },
    { where: { MaDatPhong: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cập nhật đơn đặt thành công.",
        });
      } else {
        res.send({
          message: `Không thể cập nhật đơn đặt. \nĐơn đặt có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi cập nhật đơn ${err}`,
      });
    });
};

// Xóa đơn
exports.deleteDatPhong = (req, res) => {
  const id = req.query.id;
  DatPhong.destroy({
    where: { MaDatPhong: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Xóa đơn thành công.",
        });
      } else {
        res.send({
          message: `Không thể xóa đơn. \nĐơn có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi xóa đơn`,
      });
    });
};
