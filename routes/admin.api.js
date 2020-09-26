const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const validators = require("../middlewares/validators");
const authMiddleware = require("../middlewares/authentication");
const fileUpload = require("../helpers/upload.helper")("public/images/");
const uploader = fileUpload.uploader;
const { body, param } = require("express-validator");


/**
 * @route GET api/admin/
 * @description Get 9 products
 * @access Private
 */

router.get(
    "/products",
    authMiddleware.isAdminRequired,
    adminController.adminGetProducts
);

/**
* @route POST api/products
* @description admin create a new product 
* @access Login required
*/
router.post(
    "/products/add",
    authMiddleware.isAdminRequired,
    adminController.createNewProduct
);

/**
* @route PUT api/products/:id
* @description admin Update product
* @access Login required
*/
router.put(
    "/products/:id",
    authMiddleware.isAdminRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId),

    ]),
    adminController.updateSingleProduct
);

/**
 * @route DELETE api/products/:id
 * @description Delete a product
 * @access Login required
 */
router.delete(
    "/products/:id",
    authMiddleware.isAdminRequired,
    validators.validate([
        param("id").exists().isString().custom(validators.checkObjectId),
    ]),
    adminController.deleteSingleProduct
);


module.exports = router;