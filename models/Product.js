const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name of product is required!"],
      trim: true,
      unique: true,
      // maxlength: [
      //   40,
      //   "A name of product must have less or equal then 40 characters",
      // ],
      // minlength: [
      //   4,
      //   "A name of product must have greater or equal then 10 characters",
      // ],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product need a description"],
    },

    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product need a category"],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },

    inStock: {
      type: Number,
      required: [true, "A product mush have a quantity in stock."],
      min: [1, "Stock size must be greater than or equal to 1."],
    },
    availability: {
      type: Number,
      required: [true, "Availability is required."],
      default: 30,
      min: [0, "Availability must be greater or equal to 0."],
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      trim: true,
    },
    priceDiscount: {
      type: Number,
      min: 0,
      max: 100
    },
    images: [String],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.plugin(require("./plugins/isDeletedFalse"));

module.exports = mongoose.model("Product", productSchema);
