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
    timestamps: false, // If your table doesn't have timestamps, you can disable them here
  });

  return Phong;
};
