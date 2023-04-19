module.exports = (sequelize, Sequelize) => {
    const PhuThuDatPhong = sequelize.define("PhuThuDatPhong", {
      MaDatPhong: {
        type: Sequelize.INTEGER,
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
      timestamps: false, // If your table doesn't have timestamps, you can disable them here
    });
  
    return PhuThuDatPhong;
  };
  