const {
  AppError,
  catchAsync,
  sendResponse,
} = require("../helpers/utils.helpers");

const User = require("../models/User")
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Product = require("../models/Product");

const userController = {};

userController.register = catchAsync(async (req, res, next) => {
  let { name, email, avatarUrl, password, gender } = req.body;
  let user = await User.findOne({ email });
  if (user)
    return next(new AppError(409, "User already exists", "Register Error"));

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password + "", salt);  //chuyen so thanh string
  user = await User.create({
    name,
    email,
    password,
    avatarUrl,
    gender,
  });
  const accessToken = await user.generateToken();
  return sendResponse(
    res,
    200,
    true,
    { user, accessToken },
    null,
    "Create user successful"
  );
});
userController.updateProfile = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const allows = ["name", "password", "avatarUrl"];
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError(404, "Account not found", "Update Profile Error"));
  }

  allows.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });
  await user.save();
  return sendResponse(
    res,
    200,
    true,
    user,
    null,
    "Update Profile successfully"
  );
});


const createNewCart = require("../helpers/khoa")

userController.getCurrentUser = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  let user = await User.findById(userId);
  const foo = await createNewCart(user);
  user = foo[0]
  const cart = foo[1]
  return sendResponse(
    res,
    200,
    true,
    { user, cart },
    null,
    "Get current user successful"
  );
});

// userController.addToOrder = catchAsync(async (req, res, next) => {
//   const userId = req.userId;
//   const { productID, quantity } = req.body;

//   let user = await User.findById(userId);
//   user = user.toJSON();
//   const item = user.cart.find((product) => product.productID.equals(productID));
//   if (item) {
//     user.cart = user.cart.map((product) => {
//       if (!product.productID.equals(productID)) return product;
//       return { ...product, quantity: product.quantity + quantity };
//     });
//   } else {
//     user.cart = [...user.cart, { productID, quantity }];
//   }
//   console.log(user.cart);
//   user = await User.findByIdAndUpdate(
//     user._id,
//     {
//       $set: { cart: user.cart },
//     },
//     { new: true }
//   ).populate("cart.productID");
//   return sendResponse(
//     res,
//     200,
//     true,
//     user.cart,
//     null,
//     "Add to cart successful"
//   );
// });

module.exports = userController;