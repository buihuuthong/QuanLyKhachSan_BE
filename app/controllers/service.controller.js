const db = require("../models");
const PhuThuDatPhong = db.phuthudatphong;
const TinhTrangPhong = db.tinhtrangphong;
const TrangThaiDat = db.trangthaidat;

// Lấy thông tin phụ thu
exports.getPhuThuById = (req, res) => {
  const id = req.query.id;
  PhuThuDatPhong.findOne({ where: { MaDatPhong: id } })
    .then((phuthu) => {
      if (!phuthu) {
        return res.status(404).send({ message: "Không có phụ thu" });
      }
      res.send(phuthu);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy danh sách tình trạng phòng
exports.getDanhSachTinhTrangPhong = (req, res) => {
  TinhTrangPhong.findAll()
    .then((tinhtrangphong) => {
      if (!tinhtrangphong) {
        return res.status(404).send({ message: "Danh sách trống!" });
      }
      res.send(tinhtrangphong);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy danh sách trạng thái đặt phòng
exports.getDanhSachTrangThaiDat = (req, res) => {
  TrangThaiDat.findAll()
    .then((trangthaidat) => {
      if (!trangthaidat) {
        return res.status(404).send({ message: "Danh sách trống!" });
      }
      res.send(trangthaidat);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
