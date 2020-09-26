const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helpers");

const User = require("../models/User")
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const Category = require("../models/Category");

const adminController = {};

adminController.adminGetProducts = catchAsync(async (red, res, next) => {
    const totalProducts = await Product.find().populate("type")

    return sendResponse(res, 200, true, { totalProducts }, null, "get all products success");

})

adminController.createNewProduct = catchAsync(async (req, res, next) => {



    const {
        name,
        description,
        category,
        ratingsAverage,
        inStock,
        availability,
        price,
        images

    } = req.body;
    const type = await (await Category.findOne({ type: category }))

    const newProduct = await Product.create(
        {
            name,
            description,
            type,
            ratingsAverage,
            inStock,
            availability,
            price,
            images,

        });

    return sendResponse(res, 200, true, newProduct, null, "Create new product successful");
});


adminController.updateSingleProduct = catchAsync(async (req, res, next) => {

    const productId = req.params.id;

    const {
        name,
        description,
        category,
        ratingsAverage,
        inStock,
        availability,
        price,
        images
    } = req.body;

    const type = await Category.findOne({ type: category })

    const product = await Product.findOneAndUpdate(
        { _id: productId },
        {
            name,
            description,
            type,
            ratingsAverage,
            inStock,
            availability,
            price,
            images,

        },
        { new: true }
    );
    if (!product)
        return next(
            new AppError(
                400,
                "Product not found or User not authorized"
            )
        );
    return sendResponse(res, 200, true, product, null, "Update product successful");
});


adminController.deleteSingleProduct = catchAsync(async (req, res, next) => {

    const productId = req.params.id;


    const product = await Product.findOneAndUpdate(
        { _id: productId },
        { isDeleted: true },
        { new: true }
    );
    if (!product)
        return next(
            new AppError(
                400,
                "Product not found or User not authorized"
            )
        );
    return sendResponse(res, 200, true, null, null, "Delete product successful");
});

module.exports = adminController;