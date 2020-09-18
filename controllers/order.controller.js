const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helpers");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Category = require("../models/Category");
const orderController = {};


orderController.addItem = catchAsync(async (req, res, next) => {
    const productId = req.body.productId;
    if (!productId) return next(new AppError(400, "need product ID"))
    const quantity = req.body.quantity * 1 || 1

    const product = await Product.findById(productId)
    if (!product) return next(new AppError(404, "Product not found"))
    const products = []
    for (let i = 0; i < quantity; i++) {
        products.push(product)
    }
    const cart = await Order.findOneAndUpdate({
        user: req.userId,
        paid: false
    }, {
        $push: { products: { $each: products } }
        // $set: { products: [] }
    }, {
        new: true
    });

    return sendResponse(res, 200, true, cart, null, "add item successful");



    // default: each user has 1 and only 1 order : `pending` (can have multiple `paid` orders)
    // user > complete order => toggle `pending` => `paid` => create new order `pending`

});



orderController.removeItem = catchAsync(async (req, res, next) => {
    const productId = req.body.productId;
    if (!productId) return next(new AppError(400, "need product ID"))
    const quantity = req.body.quantity * 1 || 1

    const product = await Product.findById(productId)
    if (!product) return next(new AppError(404, "Product not found"))


    const cart = await Order.findOne({ user: req.userId, paid: false });
    for (let i = 0; i < quantity; i++) {
        const foundIndex = cart.products.findIndex(e => e._id.toString() === productId)
        if (foundIndex === -1) {
            break
        } else {
            cart.products.splice(foundIndex, 1)
        }

    };
    await cart.save();



    return sendResponse(res, 200, true, cart, null, " remove item successful");



    // default: each user has 1 and only 1 order : `pending` (can have multiple `paid` orders)
    // user > complete order => toggle `pending` => `paid` => create new order `pending`
});

orderController.completeOrder = catchAsync(async (req, res, next) => {
    const shippingInfo = req.body.shippingInfo;
    const orderId = req.params.id;
    const order = await Order.findOneAndUpdate(
        {
            _id: orderId,
            paid: false
        },
        {
            ...shippingInfo,
            paid: true
        }, {
        new: true
    }
    )
    return sendResponse(res, 200, true, order, null, "take order successful");

});
//newbracnh




module.exports = orderController;
