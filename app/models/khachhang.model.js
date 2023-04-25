module.exports = (sequelize, Sequelize) => {
  const KhachHang = sequelize.define("KhachHang", {
    MaKhachHang: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TaiKhoan: {
      type: Sequelize.STRING,
    },
    MatKhau: {
      type: Sequelize.STRING,
    },
    HoTen: {
      type: Sequelize.STRING,
    },
    NgaySinh: {
      type: Sequelize.DATE,
    },
    DiaChi: {
      type: Sequelize.STRING,
    },
    SDT: {
      type: Sequelize.STRING,
    },
    Email: {
      type: Sequelize.STRING,
    }
  }, {
    tableName: "KhachHang",
    timestamps: false
  });

  return KhachHang;
};
