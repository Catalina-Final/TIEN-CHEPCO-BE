const {
    AppError,
    catchAsync,
    sendResponse,
} = require("../helpers/utils.helpers");
const User = require("../models/User");
const Cart = require("../models/Cart")
const bcrypt = require("bcryptjs");
const authController = {};

authController.loginWithEmail = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    console.log("check mail ", email)
    const user = await User.findOne({ email }, "+password");
    console.log("chekc user", user)
    if (!user)
        return next(new AppError(400, "Invalid credentials"));

    const isMatch = await bcrypt.compare(password + "", user.password);  //chuyen so thanh string
    if (!isMatch) return next(new AppError(400, "Wrong password"));

    accessToken = await user.generateToken();
    let cart = await Cart.findOne({ createdBy: user._id }).populate("products.product")
    if (!cart) {
        cart = { products: [] };
    }
    return sendResponse(
        res,
        200,
        true,
        { user, accessToken, cart },
        null,
        "Login successful"
    );
});

authController.loginWithFacebookOrGoogle = catchAsync(
    async (req, res, next) => {
        let profile = req.user;
        profile.email = profile.email.toLowerCase();
        let user = await User.findOne({ email: profile.email });
        const randomPassword = "" + Math.floor(Math.random() * 10000000);

        if (user) {
            user = await User.findByIdAndUpdate(
                user._id,
                { avatarUrl: profile.avatarUrl },
                { new: true }
            );
        } else {
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(randomPassword, salt);
            const newUser = await User.create({
                name: profile.name,
                email: profile.email,
                password: newPassword,
                avatarUrl: profile.avatarUrl,
            });
            user = await newUser.save();
        }

        const accessToken = await user.generateToken();
        let cart = await Cart.findOne({ createdBy: user._id }).populate("products.product")
        if (!cart) {
            cart = { products: [] };
        }
        return sendResponse(
            res,
            200,
            true,
            { user, accessToken, cart },
            null,
            "Login successful"
        );
    }
);

module.exports = authController;
