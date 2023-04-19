module.exports = (sequelize, Sequelize) => {
    const DatPhong = sequelize.define("DatPhong", {
      MaDatPhong: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      MaKhachHang: {
        type: Sequelize.INTEGER,
      },
      MaPhong: {
        type: Sequelize.INTEGER,
      },
      NgayTao: {
        type: Sequelize.DATE,
      },
      NgaySua: {
        type: Sequelize.DATE,
      },
      NgayNhan: {
        type: Sequelize.DATE,
      },
      NgayTra: {
        type: Sequelize.DATE,
      },
      SoNgayThue: {
        type: Sequelize.INTEGER,
      },
      GiaThue: {
        type: Sequelize.BIGINT,
      },
      PhuThu: {
        type: Sequelize.BIGINT,
      },
      TongTien: {
        type: Sequelize.BIGINT,
      },
      GhiChu: {
        type: Sequelize.STRING,
      },
      MaNhanVien: {
        type: Sequelize.INTEGER,
      },
      MaTrangThai: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "DatPhong",
      timestamps: false, // If your table doesn't have timestamps, you can disable them here
    });
  
    return DatPhong;
  };
  