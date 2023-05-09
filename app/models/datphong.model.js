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
      NguoiLon: {
        type: Sequelize.INTEGER,
      },
      TreEm: {
        type: Sequelize.INTEGER,
      },
      GiaThue: {
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
      timestamps: false,
    });
  
    return DatPhong;
  };
  