const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helpers");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order")
const User = require("../models/User");
const Cart = require("../models/Cart");
const orderController = {};

orderController.createOrder = catchAsync(async (req, res, next) => {
    const user = req.userId;

    const {
        fullName,
        phone,
        address,
    } = req.body;
    //lay info khach nhap va luu vao database cuar user
    // const order = {_id:..., user:ObjectId, products:[{}, {}, {product, quantity, ...}], shipping: {...}, paid: true/false }
    const cart = await Cart.findOne({ createdBy: user }).populate("products.product", "name price")
    const order = await Order.create({
        user,
        products: cart.products,
        shipping: {
            fullName,
            phone,
            address,
        },
        paid: false
    });

    return sendResponse(res, 200, true, order, null, "get shipping info successful");

})

module.exports = orderController;