module.exports = (sequelize, Sequelize) => {
    const PhuThuDatPhong = sequelize.define("PhuThuDatPhong", {
      MaDatPhong: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      PhuThu: {
        type: Sequelize.BIGINT,
      },
      LyDo: {
        type: Sequelize.STRING,
      },
      GhiChu: {
        type: Sequelize.STRING,
      },
      NgayTao: {
        type: Sequelize.DATE,
      },
      MaNhanVien: {
        type: Sequelize.INTEGER,
      },
    },
    {
      tableName: "PhuThuDatPhong",
      timestamps: false,
    });
  
    return PhuThuDatPhong;
  };
  