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
      timestamps: false, // If your table doesn't have timestamps, you can disable them here
    }
  );

  return ChucVu;
};
