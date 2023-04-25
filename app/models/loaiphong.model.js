module.exports = (sequelize, Sequelize) => {
    const LoaiPhong = sequelize.define(
      "LoaiPhong",
      {
        MaLoaiPhong: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        TenLoaiPhong: {
          type: Sequelize.STRING,
        },
        GiaThue: {
          type: Sequelize.BIGINT,
        },
      },
      {
        tableName: "LoaiPhong",
        timestamps: false,
      }
    );
  
    return LoaiPhong;
  };
  