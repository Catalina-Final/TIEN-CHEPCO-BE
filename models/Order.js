const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Order must have a UserId']
    },
    products: [{
      product: {
        type: String,
        required: [true, 'Order must have a product name']
      },
      color: {
        type: String,
        required: [true, 'Product must have color']
      },
      price: {
        type: Number,
        required: [true, 'Product must have price']
      },
      priceDiscount: {
        type: Number,
        required: [true, 'Product must have price discount']
      },
      quantity: {
        type: Number,
        required: [true, "Need quantity for the bill"]
      }
    }],
    shipping: {
      fullname: {
        type: String,
        required: [true, "Shipping need a fullname for the bill"],
      },
      addressLine1: {
        type: String,
        required: [true, "Need address for the bill"],
      },
      addressLine2: {
        type: String,
      },
      telephone: {
        type: Number,
        required: [true, "Need telephone number for the bill"],
      },
      city: {
        type: String,
        required: [true, "Need city for the bill"],
      },
      region: {
        type: String,
      },
      zipCode: {
        type: Number,
        required: [true, "Need telephone number for the bill"],
      },
      country: {
        type: String,
        required: [true, "Need country for the bill"],
      }
    },
    subTotal: {
      type: Number,
      required: [true, "Need subTotal for the bill"]
    },
    discount: {
      type: Number,
      required: [true, "Need discount for the bill"]
    },
    total: {
      type: Number,
      required: [true, "Need total for the bill"]
    },
    paymentID: {
        type: String,
        default: null,
        required: [true, 'Order must have a PaymentID']
    },
    paid: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }

});

module.exports = mongoose.model("Order", orderSchema);
