const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
const db = require("./app/models");


app.use(cors({
  origin: 'http://localhost:3000', // tên miền của trang web của bạn
  credentials: true // cho phép gửi cookie
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "auth-token",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

// Synchronize models with the database
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Quan Ly Khach San application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/nhanvien.routes')(app);
require('./app/routes/phong.routes')(app);
require('./app/routes/khachhang.routes')(app);
require('./app/routes/datphong.routes')(app);
require('./app/routes/service.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});