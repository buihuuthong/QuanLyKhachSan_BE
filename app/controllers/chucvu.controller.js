const db = require("../models");
const ChucVu = db.chucvu;

// Lấy danh sách chức vụ
exports.getAllChucVu = (req, res) => {
  ChucVu.findAll()
    .then((chucvu) => {
      res.send(chucvu);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};