module.exports = (sequelize, Sequelize) => {
  const Phong = sequelize.define("Phong", {
    MaPhong: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenPhong: {
      type: Sequelize.STRING,
    },
    MaLoaiPhong: {
      type: Sequelize.INTEGER,
    },
    MaTinhTrang: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "Phong",
    timestamps: false,
  });

  return Phong;
};
