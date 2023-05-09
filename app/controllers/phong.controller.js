const db = require("../models");
const Phong = db.phong;
const LoaiPhong = db.loaiphong;
const TinhTrangPhong = db.tinhtrangphong;
const { getPagination, getPagingData } = require("../middlewares/pagination");

// Đếm số lượng phòng
exports.countPhong = (req, res) => {
  Phong.count()
    .then((count) => {
      res.json({ count });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// Lấy danh sách phòng
exports.getAllPhong = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Phong.findAndCountAll({
    include: [
      {
        model: LoaiPhong,
        as: "LoaiPhong",
      },
      {
        model: TinhTrangPhong,
        as: "TinhTrangPhong",
      },
    ],
    limit,
    offset,
  })
    .then((phong) => {
      const response = getPagingData(phong, page, limit);
      res.send(response);
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

// Lấy phòng by id
exports.getPhongById = (req, res) => {
  const id = req.query.id;
  Phong.findOne({
    include: [
      {
        model: LoaiPhong,
        as: "LoaiPhong",
      },
      {
        model: TinhTrangPhong,
        as: "TinhTrangPhong",
      },
    ],
    where: { MaPhong: id },
  })
    .then((phong) => {
      if (!phong) {
        return res.status(404).send({ message: "Không có phòng" });
      }
      res.send(phong);
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
