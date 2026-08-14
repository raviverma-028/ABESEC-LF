const express = require("express");
const mongoose = require("mongoose");
const FoundItem = require("../models/FoundItem");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// GET ALL FOUND ITEMS
// PUBLIC
// Anyone can view found items
// =====================================================

router.get("/", async (req, res) => {
  try {
    const items = await FoundItem.find()
      .sort({ createdAt: -1 });

    res.status(200).json(items);

  } catch (error) {
    console.error("Get Found Items Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch found items",
      error: error.message,
    });
  }
});


// =====================================================
// GET SINGLE FOUND ITEM
// PUBLIC
// Anyone can view a single found item
// =====================================================

router.get("/:id", async (req, res) => {
  try {

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid found item ID",
      });
    }

    const item = await FoundItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    res.status(200).json(item);

  } catch (error) {
    console.error("Get Single Found Item Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch found item",
      error: error.message,
    });
  }
});


// =====================================================
// ADD NEW FOUND ITEM
// LOGIN REQUIRED
// =====================================================

router.post("/", authMiddleware, async (req, res) => {
  try {

    const newItem = new FoundItem({
      itemName: req.body.itemName,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      dateFound: req.body.dateFound,
      image: req.body.image || "",
      finderName: req.body.finderName,
      contactEmail: req.body.contactEmail,
      contactPhone: req.body.contactPhone || "",

      // IMPORTANT:
      // userId frontend se nahi liya jayega.
      // JWT se verified logged-in user ki ID aayegi.
      userId: req.user.id,
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      success: true,
      message: "Found item added successfully",
      item: savedItem,
    });

  } catch (error) {
    console.error("Add Found Item Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to add found item",
      error: error.message,
    });
  }
});


// =====================================================
// UPDATE FOUND ITEM
// LOGIN REQUIRED
// ONLY OWNER CAN UPDATE
// =====================================================

router.put("/:id", authMiddleware, async (req, res) => {
  try {

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid found item ID",
      });
    }

    // Find item
    const item = await FoundItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    // Check ownership
    if (
      !item.userId ||
      item.userId.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this item",
      });
    }

    // Update only allowed fields
    item.itemName =
      req.body.itemName ?? item.itemName;

    item.category =
      req.body.category ?? item.category;

    item.description =
      req.body.description ?? item.description;

    item.location =
      req.body.location ?? item.location;

    item.dateFound =
      req.body.dateFound ?? item.dateFound;

    item.image =
      req.body.image ?? item.image;

    item.finderName =
      req.body.finderName ?? item.finderName;

    item.contactEmail =
      req.body.contactEmail ?? item.contactEmail;

    item.contactPhone =
      req.body.contactPhone ?? item.contactPhone;

    // Status update allowed
    if (req.body.status !== undefined) {
      item.status = req.body.status;
    }

    // NEVER allow userId to be changed
    item.userId = req.user.id;

    const updatedItem = await item.save();

    res.status(200).json({
      success: true,
      message: "Found item updated successfully",
      item: updatedItem,
    });

  } catch (error) {
    console.error("Update Found Item Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to update found item",
      error: error.message,
    });
  }
});


// =====================================================
// DELETE FOUND ITEM
// LOGIN REQUIRED
// ONLY OWNER CAN DELETE
// =====================================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    // Check valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid found item ID",
      });
    }

    // Find item
    const item = await FoundItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Found item not found",
      });
    }

    // Check ownership
    if (
      !item.userId ||
      item.userId.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this item",
      });
    }

    // Delete item
    await FoundItem.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Found item deleted successfully",
    });

  } catch (error) {
    console.error("Delete Found Item Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete found item",
      error: error.message,
    });
  }
});


module.exports = router;