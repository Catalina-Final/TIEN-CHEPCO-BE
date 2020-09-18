const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helpers");
const Product = require("../models/Product");
const Category = require("../models/Category");
// const ListProducts = require("../models/ListProducts");
//   const Review = require("../models/Review");
const productController = {};

productController.getProducts = catchAsync(async (req, res, next) => {
    const totalProducts = await Product.find().populate("type")


    return sendResponse(res, 200, true, { totalProducts }, null, "get all products success"); //, totalPages 
});

productController.getSingleProduct = catchAsync(async (req, res, next) => {
    let product = await Product.findById(req.params.id)  //.populate("user");
    if (!product)
        return next(new AppError(404, "Product not found"));
    product = product.toJSON();
    // product.reviews = await Review.find({ product: product._id }) //.populate("user");
    return sendResponse(res, 200, true, product, null, "get single product success");
});

productController.createNewProduct = catchAsync(async (req, res, next) => {
    const user = req.userId;

    const {
        name,
        description,
        category,
        inStock,
        price,
        availability,
        ratingsAverage } = req.body;
    const type = await Category.findOne({ type: category })


    const newProduct = await Product.create({
        name,
        description,
        type,
        ratingsAverage,
        inStock,
        availability,
        price,
        createdBy: user
    });

    return sendResponse(res, 200, true, newProduct, null, "Create new product successful");
});

productController.updateSingleProduct = catchAsync(async (req, res, next) => {
    const user = req.userId;
    const productId = req.params.id;
    const {
        name,
        description,
        category,
        inStock,
        price,
        availability,
        ratingsAverage
    } = req.body;

    const type = await Category.findOne({ type: category })
    console.log(user)
    console.log(productId)
    const product = await Product.findOneAndUpdate(
        { _id: productId, createdBy: user },
        {
            name,
            description,
            type,
            ratingsAverage,
            inStock,
            availability,
            price,
            createdBy: user
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

productController.deleteSingleProduct = catchAsync(async (req, res, next) => {
    const user = req.userId;
    const productId = req.params.id;
    console.log("check info", user)
    console.log("check info", productId)

    const product = await Product.findOneAndUpdate(
        { _id: productId, createdBy: user },
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

module.exports = productController;
