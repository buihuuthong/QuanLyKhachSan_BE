module.exports = (sequelize, Sequelize) => {
  const NhanVien = sequelize.define("NhanVien", {
    MaNhanVien: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TaiKhoan: {
      type: Sequelize.STRING
    },
    MatKhau: {
      type: Sequelize.STRING
    },
    HoTen: {
      type: Sequelize.STRING
    },
    NgaySinh: {
      type: Sequelize.DATE
    },
    DiaChi: {
      type: Sequelize.STRING
    },
    SDT: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    MaChucVu: {
      type: Sequelize.INTEGER,
    },
  }, {
    tableName: "NhanVien",
    timestamps: false
  });

  return NhanVien;
};
