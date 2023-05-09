const { authJwt } = require("../middlewares");
const controller = require("../controllers/datphong.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });


  app.get(
    "/api/dat-phong/so-luong",
    [authJwt.verifyToken],
    controller.countDatPhong
  );

  app.get(
    "/api/dat-phong/danh-sach",
    [authJwt.verifyToken],
    controller.getAllDatPhong
  );

  app.get(
    "/api/dat-phong/don-dat",
    [authJwt.verifyToken],
    controller.getDatPhongById
  );

  app.post(
    "/api/dat-phong/tao-don",
    [authJwt.verifyToken],
    controller.createDatPhong
  );

  app.put(
    "/api/dat-phong/sua-don",
    [authJwt.verifyToken],
    controller.updateDatPhong
  );

  // app.delete(
  //   "/api/dat-phong/xoa-don",
  //   [authJwt.verifyToken],
  //   controller.deleteDatPhong
  // );
};
