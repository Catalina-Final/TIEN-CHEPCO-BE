const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ListProducts',
        required: true
    },
    content: {
        type: String,
        required: [true, 'Content is required.'],
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required.'],
        trim: true,
        min: 0,
        max: 5
    },
    type: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
});

module.exports = mongoose.model("Review", reviewSchema);
