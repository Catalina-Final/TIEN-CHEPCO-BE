const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const validators = require("../middlewares/validators");
const authMiddleware = require("../middlewares/authentication");
const fileUpload = require("../helpers/upload.helper")("public/images/");
const uploader = fileUpload.uploader;
const { body, param } = require("express-validator");

/**
 * @route GET api/products?page=1&limit=10
 * @description Get 9 products
 * @access Public
 */

router.get("/", productController.getProducts);


/**
 * @route GET api/products/:id
 * @description Get each product
 * @access Public
 */
router.get(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productController.getSingleProduct
);


/**
 * @route post api/products/cart
 * @body {product: ObjectId, quantity: Number}
 * @description Add to cart
 * @access Login required
 */
router.post("/cart", authMiddleware.loginRequired, productController.addToCart);

/**
 * @route delete api/products/cart/:id
 * @description remove product id
 * @access Login required
 */
router.delete("/cart/:id", authMiddleware.loginRequired, productController.removeProductFromCart);

/**
 * @route put api/products/cart/:id
 * @body {quantity: Number}
 * @description update cart
 * @access Login required
 */
router.put("/cart/:id", authMiddleware.loginRequired, productController.updateCart);


module.exports = router;
