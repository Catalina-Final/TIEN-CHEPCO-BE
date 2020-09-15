const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listProductsSchema = mongoose.Schema(
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
        // imageCover: {
        //   type: String,
        //   required: [true, "A product must have a cover image"],
        // },
        ratingsAverage: {
          type: Number,
          default: 4.5,
          min: [1, "Rating must be above 1.0"],
          max: [5, "Rating must be below 5.0"],
          set: (val) => Math.round(val * 10) / 10,
        },
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        
        ratingsQuantity: {
          type: Number,
          default: 0,
        },
        list: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
          },
        ],
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
        createdBy: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      }
  );

module.exports = mongoose.model("ListProducts", listProductsSchema);
