const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must have a UserId']
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  products: [Schema(
    {
      product: {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        price: { type: Number, require: true },
        name: { type: String, require: true }
      },

      quantity: {
        type: Number,
        required: [true, "A product need a quantity"],
      },
      priceDiscount: {
        type: Number,
        // required: [true, 'Product must have price discount']
      },
    },
  )],
  shipping: {
    fullName: {
      type: String,
      required: [true, "Shipping need a fullname for the bill"],
    },
    address: {
      type: String,
      required: [true, "Need address for the bill"],
    },
    phone: {
      type: Number,
      required: [true, "Need telephone number for the bill"],
    },
  },
  paid: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }

});

module.exports = mongoose.model("Order", orderSchema);
