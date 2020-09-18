const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const orderController = require("../controllers/order.controller");
const validators = require("../middlewares/validators");
const authMiddleware = require("../middlewares/authentication");
const fileUpload = require("../helpers/upload.helper")("public/images/");
const uploader = fileUpload.uploader;
const { body, param } = require("express-validator");

router.post(
    "/addToCart",
    authMiddleware.loginRequired,
    orderController.addItem
);
router.post(
    "/removeFromCart",
    authMiddleware.loginRequired,
    orderController.removeItem
);

// /delete (delete the whole product) => 

///        $pullAll: { products._id: productId  } }
// router.post(
//     "/deleteFromOrder",
//     authMiddleware.loginRequired,
//     orderController.deleteProduct
// );

router.post(
    "/completeOrder",
    authMiddleware.loginRequired,
    orderController.completeOrder
);




module.exports = router;