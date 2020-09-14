const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: [
        validator.isEmail,
        'Please provide a valid email']
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'others'],
      // default: 'others'
    },
    dob: {
      type: Date,
      required: false,
      default: new Date(),
      trim: true,
    },
    listInSelling: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    listSold: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }],
    listPurchased: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }],
    roles: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: false
    }
  },
  {
    timestamps: true,
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);
userSchema.plugin(require("./plugins/isDeletedFalse"));

userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

module.exports = mongoose.model("User", userSchema);
