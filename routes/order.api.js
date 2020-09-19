const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const orderController = require("../controllers/order.controller");
const validators = require("../middlewares/validators");
const authMiddleware = require("../middlewares/authentication");
const fileUpload = require("../helpers/upload.helper")("public/images/");
const uploader = fileUpload.uploader;
const { body, param } = require("express-validator");


/**
 * @route post api/orders/
 * @body {fullName, phone, address}
 * @description create order
 * @access Login required
 */
router.post("/",
    authMiddleware.loginRequired,
    orderController.createOrder);





module.exports = router;