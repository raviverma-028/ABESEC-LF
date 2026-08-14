const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema(
  {
    // =====================================================
    // USER
    // =====================================================
    // Lost item kis logged-in student ne report kiya hai.

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

    dateLost: {
      type: Date,
      required: true,
    },

    image: {
      type: String,
      default: "",
      trim: true,
    },

    // =====================================================
    // CONTACT DETAILS
    // =====================================================

    contactName: {
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
      enum: ["lost", "found"],
      default: "lost",
    },
  },

  // =====================================================
  // TIMESTAMPS
  // =====================================================

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LostItem", lostItemSchema);