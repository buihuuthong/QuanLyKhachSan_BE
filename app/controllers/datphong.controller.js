const db = require("../models");
const nodemailer = require('nodemailer');
const DatPhong = db.datphong;
const KhachHang = db.khachhang;
const Phong = db.phong;
const NhanVien = db.nhanvien;
const TrangThaiDat = db.trangthaidat;
const { getPagination, getPagingData } = require("../middlewares/pagination");

// Lấy danh sách đặt phòng
exports.getAllDatPhong = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  DatPhong.findAndCountAll({
    include: [
      {
        model: KhachHang,
        as: "KhachHang",
        attributes: ["HoTen"],
      },
      {
        model: Phong,
        as: "Phong",
        attributes: ["TenPhong"],
      },
      {
        model: NhanVien,
        as: "NhanVien",
        attributes: ["HoTen"],
      },
      {
        model: TrangThaiDat,
        as: "TrangThaiDat",
        attributes: ["TenTrangThai"],
      },
    ],
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
    include: [
      {
        model: KhachHang,
        as: "KhachHang",
        attributes: ["HoTen"],
      },
      {
        model: Phong,
        as: "Phong",
        attributes: ["TenPhong"],
      },
      {
        model: NhanVien,
        as: "NhanVien",
        attributes: ["HoTen"],
      },
      {
        model: TrangThaiDat,
        as: "TrangThaiDat",
        attributes: ["TenTrangThai"],
      },
    ],
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
    NguoiLon: req.body.NguoiLon,
    TreEm: req.body.TreEm,
    GiaThue: req.body.GiaThue,
    PhuThu: req.body.PhuThu,
    TongTien: req.body.TongTien,
    GhiChu: req.body.GhiChu,
    MaNhanVien: req.body.MaNhanVien,
    MaTrangThai: req.body.MaTrangThai,
  })
    .then(() => {
      // Gửi email tới khách hàng
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'buihuuthong2806@gmail.com',
          pass: 'lqvpypoaauafjbhs',
        },
      });
      
      const mailOptions = {
        from: 'buihuuthong2806@gmail.com',
        to: 'shinno2107@gmail.com', // Thay thế bằng địa chỉ email của khách hàng
        subject: 'Đơn đặt phòng thành công!',
        text: 'Cảm ơn bạn đã đặt phòng của chúng tôi.',
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
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
      NguoiLon: req.body.NguoiLon,
      TreEm: req.body.TreEm,
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
