const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema(
  {
    // =====================================================
    // USER
    // =====================================================
    // Ye batayega ki found item kis logged-in student
    // ne report kiya hai.

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // =====================================================
    // ITEM DETAILS
    // =====================================================

    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    dateFound: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================================
    // FINDER DETAILS
    // =====================================================

    finderName: {
      type: String,
      required: true,
      trim: true,
    },

    contactEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    contactPhone: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================================
    // STATUS
    // =====================================================

    status: {
      type: String,
      enum: ["found", "claimed"],
      default: "found",
    },
  },

  // =====================================================
  // TIMESTAMPS
  // =====================================================

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoundItem", foundItemSchema);