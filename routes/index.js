var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ status: 'ok', data: "Hello Chep" });

});
// user Api
const userApi = require('./user.api')
router.use('/users', userApi);

// authApi
const authApi = require("./auth.api");
router.use("/auth", authApi);

// productApi
const blogApi = require("./product.api");
router.use("/products", blogApi);

// orderApi
const orderApi = require("./order.api");
router.use("/orders", orderApi);


module.exports = router;
