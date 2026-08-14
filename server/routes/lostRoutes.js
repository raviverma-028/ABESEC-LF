const express = require("express");
const mongoose = require("mongoose");

const LostItem = require("../models/LostItem");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// =====================================================
// GET ALL LOST ITEMS
// PUBLIC
// Anyone can view lost items
// =====================================================

router.get("/", async (req, res) => {
  try {
    const items = await LostItem.find()
      .sort({ createdAt: -1 });

    // Direct array return
    // Frontend compatibility ke liye
    res.status(200).json(items);

  } catch (error) {
    console.error("Get Lost Items Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lost items",
      error: error.message,
    });
  }
});


// =====================================================
// GET SINGLE LOST ITEM
// PUBLIC
// =====================================================

router.get("/:id", async (req, res) => {
  try {

    // Check valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lost item ID",
      });
    }

    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Lost item not found",
      });
    }

    res.status(200).json(item);

  } catch (error) {
    console.error("Get Single Lost Item Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lost item",
      error: error.message,
    });
  }
});


// =====================================================
// ADD NEW LOST ITEM
// LOGIN REQUIRED
// =====================================================

router.post("/", authMiddleware, async (req, res) => {
  try {

    const {
      itemName,
      category,
      description,
      location,
      dateLost,
      image,
      contactName,
      contactEmail,
      contactPhone,
    } = req.body;


    // =================================================
    // VALIDATION
    // =================================================

    if (
      !itemName ||
      !category ||
      !description ||
      !location ||
      !dateLost ||
      !contactName ||
      !contactEmail
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }


    // =================================================
    // CREATE LOST ITEM
    // =================================================

    const newItem = new LostItem({

      itemName: itemName.trim(),

      category: category.trim(),

      description: description.trim(),

      location: location.trim(),

      dateLost,

      image: image?.trim() || "",

      contactName: contactName.trim(),

      contactEmail: contactEmail.toLowerCase().trim(),

      contactPhone: contactPhone?.trim() || "",

      // IMPORTANT:
      // User ID JWT se aayegi
      // Frontend ke userId ko trust nahi karna
      userId: req.user.id,

    });


    const savedItem = await newItem.save();


    res.status(201).json({
      success: true,
      message: "Lost item added successfully",
      item: savedItem,
    });

  } catch (error) {

    console.error("Add Lost Item Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to add lost item",
      error: error.message,
    });
  }
});


// =====================================================
// UPDATE LOST ITEM
// LOGIN REQUIRED
// ONLY OWNER CAN UPDATE
// =====================================================

router.put("/:id", authMiddleware, async (req, res) => {
  try {

    // =================================================
    // VALIDATE ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lost item ID",
      });
    }


    // =================================================
    // FIND ITEM
    // =================================================

    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Lost item not found",
      });
    }


    // =================================================
    // CHECK OWNER
    // =================================================

    if (
      !item.userId ||
      item.userId.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this item",
      });
    }


    // =================================================
    // UPDATE ALLOWED FIELDS ONLY
    // =================================================

    if (req.body.itemName !== undefined) {
      item.itemName = req.body.itemName.trim();
    }

    if (req.body.category !== undefined) {
      item.category = req.body.category.trim();
    }

    if (req.body.description !== undefined) {
      item.description = req.body.description.trim();
    }

    if (req.body.location !== undefined) {
      item.location = req.body.location.trim();
    }

    if (req.body.dateLost !== undefined) {
      item.dateLost = req.body.dateLost;
    }

    if (req.body.image !== undefined) {
      item.image = req.body.image.trim();
    }

    if (req.body.contactName !== undefined) {
      item.contactName = req.body.contactName.trim();
    }

    if (req.body.contactEmail !== undefined) {
      item.contactEmail =
        req.body.contactEmail.toLowerCase().trim();
    }

    if (req.body.contactPhone !== undefined) {
      item.contactPhone = req.body.contactPhone.trim();
    }


    // =================================================
    // NEVER CHANGE OWNER
    // =================================================

    item.userId = req.user.id;


    const updatedItem = await item.save();


    res.status(200).json({
      success: true,
      message: "Lost item updated successfully",
      item: updatedItem,
    });

  } catch (error) {

    console.error("Update Lost Item Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to update lost item",
      error: error.message,
    });
  }
});


// =====================================================
// DELETE LOST ITEM
// LOGIN REQUIRED
// ONLY OWNER CAN DELETE
// =====================================================

router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    // =================================================
    // VALIDATE ID
    // =================================================

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lost item ID",
      });
    }


    // =================================================
    // FIND ITEM
    // =================================================

    const item = await LostItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Lost item not found",
      });
    }


    // =================================================
    // CHECK OWNER
    // =================================================

    if (
      !item.userId ||
      item.userId.toString() !== req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this item",
      });
    }


    // =================================================
    // DELETE
    // =================================================

    await LostItem.findByIdAndDelete(req.params.id);


    res.status(200).json({
      success: true,
      message: "Lost item deleted successfully",
    });

  } catch (error) {

    console.error("Delete Lost Item Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete lost item",
      error: error.message,
    });
  }
});


module.exports = router;