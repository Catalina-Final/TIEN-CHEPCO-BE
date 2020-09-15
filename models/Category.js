const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema(
    {
        type: {
          type: String,
          enum: ["milk", "tea"],
          required: [true, "Category need a type!"],
          unique: true
        }
    
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
      }
  );

module.exports = mongoose.model("Category", categorySchema);
