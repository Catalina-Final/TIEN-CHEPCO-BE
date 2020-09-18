const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

const validators = require("../middlewares/validators");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/authentication");

/**
 * @route POST api/users
 * @description Register new user
 * @access Public
 */
router.post(
  "/",
  validators.validate([
    body("name", "Invalid name").exists().notEmpty(),
    body("email", "Invalid email").exists().isEmail(),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  userController.register
);

/**
 * @route PUT api/users/
 * @description Update user profile
 * @access Login required
 */
router.put("/me", authMiddleware.loginRequired, userController.updateProfile);

/**
 * @route GET api/users/me
 * @description Get current user info
 * @access Login required
 */
router.get("/me", authMiddleware.loginRequired, userController.getCurrentUser);
//   /**
//  * @route post api/users/order
//  * @description Add to cart
//  * @access Login required
//  */
// router.post("/cart", authMiddleware.loginRequired, userController.addToOrder);


module.exports = router;