const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter product Name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },

  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },

  originalPrice: {
    type: Number,
  },

  ratings: {
    type: Number,
    default: 0,
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },

  Stock: {
    type: Number,
    required: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },

  soldCount: {
    type: Number,
    default: 0,
  },

  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  tags: {
    isNew: { type: Boolean, default: false },
    isSale: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
