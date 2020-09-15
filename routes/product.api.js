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
 * @route POST api/products
 * @description admin reate a new product 
 * @access Login required
 */
router.post(
  "/",
  authMiddleware.loginRequired,
  // uploader.array("images", 2),
  // validators.validate([
  //   body("title", "Missing title").exists().notEmpty(),
  //   body("content", "Missing content").exists().notEmpty(),
  // ]),
  productController.createNewProduct
);

/**
 * @route PUT api/products/:id
 * @description admin Update product
 * @access Login required
 */
router.put(
  "/:id",
  authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    // body("title", "Missing title").exists().notEmpty(),
    // body("content", "Missing content").exists().notEmpty(),
  ]),
  productController.updateSingleProduct
);

/**
 * @route DELETE api/products/:id
 * @description Delete a product
 * @access Login required
 */
router.delete(
  "/:id",
  authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  productController.deleteSingleProduct
);

module.exports = router;
