const db = require("../models");
const PhuThuDatPhong = db.phuthudatphong;

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