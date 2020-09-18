const Order = require("../models/Order")



module.exports = async (user) => {
    let cart = await Order.findOne({
        user: user._id,
        paid: false
    });
    if (!cart) {
        cart = await Order.create({
            user: user._id,
            products: []
        })
    }
    return [user, cart]
};