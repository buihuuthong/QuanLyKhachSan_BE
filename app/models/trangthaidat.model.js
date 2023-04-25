module.exports = (sequelize, Sequelize) => {
    const TrangThaiDat = sequelize.define(
      "TrangThaiDat",
      {
        MaTrangThai: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        TenTrangThai: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "TrangThaiDat",
        timestamps: false,
      }
    );
  
    return TrangThaiDat;
  };
  