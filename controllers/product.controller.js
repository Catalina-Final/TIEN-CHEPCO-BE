const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helpers");
const Product = require("../models/Product");
const Category = require("../models/Category");
const User = require("../models/User");
const Cart = require("../models/Cart");
// const ListProducts = require("../models/ListProducts");
//   const Review = require("../models/Review");
const productController = {};

productController.getProducts = catchAsync(async (req, res, next) => {
    const totalProducts = await Product.find()


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
        ratingsAverage,
        inStock,
        availability,
        price,
        images

    } = req.body;
    const type = await Category.findOne({ type: category })

    const newProduct = await Product.create({
        name,
        description,
        type,
        ratingsAverage,
        inStock,
        availability,
        price,
        images,
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
        ratingsAverage,
        inStock,
        availability,
        price,
        images
    } = req.body;

    const type = await Category.findOne({ type: category })

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
            images,
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

productController.addToCart = catchAsync(async (req, res, next) => {
    const userId = req.userId;
    const { product, quantity } = req.body;
    let cart = await Cart.findOne({ createdBy: userId })
    if (!cart) {
        cart = await Cart.create({
            products: [{ product, quantity }],
            createdBy: userId
        })
        await Cart.populate(cart, { path: "products.product" })
        return sendResponse(res, 200, true, cart, null, "Create Cart Successful")
    } else {
        console.log(cart)
        cart = cart.toJSON();
        const item = cart.products.find((item) => item.product.equals(product));
        if (item) {
            cart.products = cart.products.map((item) => {
                if (!item.product.equals(product)) return item;
                return { ...item, quantity: item.quantity + quantity };
            });
        } else {
            cart.products = [...cart.products, { product, quantity }];
        }

        cart = await Cart.findByIdAndUpdate(
            cart._id,
            {
                $set: { products: cart.products },
            },
            { new: true }
        ).populate("products.product");

        return sendResponse(res, 200, true, cart, null, "Update Cart Successful")

    }
})

productController.removeProductFromCart = catchAsync(async (req, res, next) => {
    const userId = req.userId;
    const productID = req.params.id;
    let cart = await Cart.findOne({ createdBy: userId })
    if (!cart) {
        return next(new AppError(400, "Cart not found", "Remove Product Error"))
    }
    cart = cart.toJSON();
    cart.products = cart.products.filter(
        (item) => !item.product.equals(productID)
    );

    cart = await Cart.findByIdAndUpdate(
        cart._id,
        {
            $set: { products: cart.products },
        },
        { new: true }
    ).populate("products.product");

    return sendResponse(res, 200, true, cart, null, "Update Cart Successful")
})

productController.updateCart = catchAsync(async (req, res, next) => {
    const userId = req.userId;
    const { quantity } = req.body;
    const productID = req.params.id;

    let cart = await Cart.findOne({ createdBy: userId })
    if (!cart) {
        return next(new AppError(400, "Cart not found", "Update Product Error"))
    }
    cart = cart.toJSON();
    console.log({ products: cart.products, productID });
    const item = cart.products.find((item) => item.product.equals(productID));
    if (item) {
        cart.products = cart.products.map((item) => {
            if (!item.product.equals(productID)) return item;
            return { ...item, quantity: quantity };
        });
    } else {
        return next(new AppError(400, "Product not found", "Update Product Error"))
    }

    cart = await Cart.findByIdAndUpdate(
        cart._id,
        {
            $set: { products: cart.products },
        },
        { new: true }
    ).populate("products.product");

    return sendResponse(res, 200, true, cart, null, "Update Cart Successful")
})

// productController.updateCart = catchAsync(async (req, res, next) => {
//     const userId = req.userId;
//     let cart = await Cart.findOne({ createdBy: userId })
//     if (!cart) {
//         return next(new AppError(400, "Cart not found", "Remove Product Error"))
//     }

//     const { products } = req.body;
//     cart = await Cart.findByIdAndUpdate(
//         cart._id,
//         {
//             $set: { products: products },
//         },
//         { new: true }
//     ).populate("products.product");

//     return sendResponse(res, 200, true, cart, null, "Update Cart Successful")
// })

module.exports = productController;
