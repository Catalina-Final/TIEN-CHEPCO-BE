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
    await Cart.remove(cart);

    return sendResponse(res, 200, true, order, null, "get shipping info successful");

})
// orderController.AdminGetOrders
orderController.AdminGetOrders = catchAsync(async (req, res, next) => {
    const user = req.userId
    const totalOrders = await Order.find({})
    return sendResponse(
        res,
        200,
        true,
        { totalOrders, user },
        null,
        "admin get all orders success"
    )
})

orderController.UserGetOrders = catchAsync(async (req, res, next) => {
    const user = req.userId
    const totalOrders = await Order.find({ user })
    return sendResponse(
        res,
        200,
        true,
        { totalOrders, user },
        null,
        "user get all orders success"
    )
})
orderController.updateOrder = catchAsync(async (req, res, next) => {
    const orderId = req.params.id

    const order = await Order.findOneAndUpdate({ _id: orderId, paid: false }, { $set: { paid: true } }, { new: true })
    if (!order) return next(new AppError(404, "Order not found or already paid"))
    return sendResponse(
        res,
        200,
        true,
        null,
        null,
        "Update order status"
    )

})

module.exports = orderController;