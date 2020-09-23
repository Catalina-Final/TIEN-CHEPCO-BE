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

/**
 * @route GET api/orders/admin/
 * @description Admin get all orders pending from user all user 
 * @access login requied
 */
router.get(
    "/admin/",
    authMiddleware.loginRequired,

    orderController.AdminGetOrders
);

/**
 * @route GET api/orders/user/
 * @description Get all orders pending from user login 
 * @access login requied
 */
router.get(
    "/user/",
    authMiddleware.loginRequired,

    orderController.UserGetOrders
);

/**
 * @route PUT api/orders/:id
 * @description admin Update order
 * @access Login required
 */
router.put(
    "/:id",
    authMiddleware.loginRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId),

    ]),
    orderController.updateOrder
);





module.exports = router;