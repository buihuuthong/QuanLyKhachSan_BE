const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Add your models here
db.nhanvien = require("../models/nhanvien.model.js")(sequelize, Sequelize);
db.khachhang = require("../models/khachhang.model.js")(sequelize, Sequelize);
db.phong = require("../models/phong.model.js")(sequelize, Sequelize);
db.datphong = require("../models/datphong.model.js")(sequelize, Sequelize);
db.phuthudatphong = require("../models/phuthudatphong.model.js")(sequelize, Sequelize);
db.chucvu = require("../models/chucvu.model.js")(sequelize, Sequelize);

db.nhanvien?.belongsTo(db.chucvu, {
  foreignKey: 'MaChucVu',
  as: 'ChucVu'
});

module.exports = db;