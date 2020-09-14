const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
    {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ListProducts",
          required: [true, "Product need a name from list product"],
        },
        description: {
          type: String,
          trim: true,
          required: [true, "Product need a description"],
        },
        color: {
          type: String,
          required: [true, "Product need a color"],
          trim: true,
          lowercase: true,
        },
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: [true, "Product need a category"],
        },
        slug: String,
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
        images: [String],
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
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

  productSchema.plugin(require("./plugins/isDeletedFalse"));
module.exports = mongoose.model("Product", productSchema);
