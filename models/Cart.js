const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = mongoose.Schema({
    products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ListProducts",
            required: [true, "A product need a name"],
          },
          color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "A product need a name"],
          },
          quantity: {
            type: Number,
            required: [true, "A product need a quantity"],
          },
        },
      ],
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Cart must have a UserId']
      },
    });

module.exports = mongoose.model("Cart", cartSchema);
