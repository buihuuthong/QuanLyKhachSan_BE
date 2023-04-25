module.exports = (sequelize, Sequelize) => {
    const TinhTrangPhong = sequelize.define(
      "TinhTrangPhong",
      {
        MaTinhTrang: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        TenTinhTrang: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "TinhTrangPhong",
        timestamps: false,
      }
    );
  
    return TinhTrangPhong;
  };
  