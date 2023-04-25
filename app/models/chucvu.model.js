module.exports = (sequelize, Sequelize) => {
  const ChucVu = sequelize.define(
    "ChucVu",
    {
      MaChucVu: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      TenChucVu: {
        type: Sequelize.STRING,
      },
    },
    {
      tableName: "ChucVu",
      timestamps: false,
    }
  );

  return ChucVu;
};
