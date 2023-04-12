const db = require("../models");
const Phong = db.phong;

// Lấy danh sách phòng
exports.getAllPhong = (req, res) => {
  Phong.findAll()
    .then((phong) => {
      res.send(phong);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Tạo phòng
exports.createPhong = (req, res) => {
  Phong.create({
    TenPhong: req.body.TenPhong,
    MaLoaiPhong: req.body.MaLoaiPhong,
    MaTinhTrang: req.body.MaTinhTrang,
  })
    .then(() => {
      res.status(201).send({ message: "Tạo phòng thành công!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Cập nhật phòng
exports.updatePhong = (req, res) => {
  const id = req.query.id; // assuming you pass the id of the room in the request URL
  Phong.update(
    {
      TenPhong: req.body.TenPhong,
      MaLoaiPhong: req.body.MaLoaiPhong,
      MaTinhTrang: req.body.MaTinhTrang,
    },
    { where: { MaPhong: id } }
  )
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cập nhật phòng thành công.",
        });
      } else {
        res.send({
          message: `Không thể cập nhật phòng. Phòng có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi cập nhật phòng ${err}`,
      });
    });
};

// Xóa phòng
exports.deletePhong = (req, res) => {
  const id = req.query.id; // assuming you pass the id of the room in the request URL
  Phong.destroy({
    where: { MaPhong: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Xóa phòng thành công.",
        });
      } else {
        res.send({
          message: `Không thể xóa phòng. Phòng có thể không được tìm thấy!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Lỗi khi xóa phòng`,
      });
    });
};
