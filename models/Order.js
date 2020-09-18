const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must have a UserId']
  },
  products: [{
    _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
      required: [true, 'Order must have a product name']
    },

    price: {
      type: Number,
      required: [true, 'Product must have price']
    },
    priceDiscount: {
      type: Number,
      // required: [true, 'Product must have price discount']
    },
    // qty: {
    //   type: Number,
    //   required: [true, "Need quantity for the bill"]
    // }
  }],
  shipping: {
    fullname: {
      type: String,
      // required: [true, "Shipping need a fullname for the bill"],
    },
    address: {
      type: String,
    },
    phone: {
      type: Number,
      // required: [true, "Need telephone number for the bill"],
    },
    city: {
      type: String,
      // required: [true, "Need city for the bill"],
    }

  },

  discount: {
    type: Number,
    // required: [true, "Need discount for the bill"]
  },
  total: {
    type: Number,
    // required: [true, "Need total for the bill"]
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
