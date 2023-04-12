const db = require("../models");

const checkDuplicateUsernameOrEmail = async (req, res, next, table) => {
  try {
    const user = await table.findOne({
      where: {
        TaiKhoan: req.body.TaiKhoan
      }
    });

    if (user) {
      return res.status(400).send({
        message: "Error: Tài khoản đã được sử dụng."
      });
    }

    const emailUser = await table.findOne({
      where: {
        Email: req.body.Email
      }
    });

    if (emailUser) {
      return res.status(400).send({
        message: "Error: Email đã được sử dụng."
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error: Internal server error"
    });
  }
};


const verify = {
  checkDuplicateUsernameOrEmail
};

module.exports = verify;