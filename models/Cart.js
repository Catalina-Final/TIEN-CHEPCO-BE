const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = Schema({
  products: [Schema(
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "A product need a name"],
      },
      quantity: {
        type: Number,
        required: [true, "A product need a quantity"],
      },
    },
  )],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Cart must have a UserId'],
    unique: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
