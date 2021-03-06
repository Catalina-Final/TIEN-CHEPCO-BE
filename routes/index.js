var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ status: 'ok', data: "Hello Chep" });

});
// user Api
const userApi = require('./user.api')
router.use('/users', userApi);
// admin Api
const adminApi = require('./admin.api')
router.use('/admin', adminApi);

// authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);
// productApi
const productApi = require("./product.api");
router.use("/products", productApi);

// orderApi
const orderApi = require("./order.api");
router.use("/orders", orderApi);

module.exports = router;
