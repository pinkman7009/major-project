const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { protect, authorize } = require("../middleware/auth");

router.put("/:id", protect, authorize(0, 1), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.phone_number = req.body.phone_number || user.phone_number;
    user.rating = req.body.rating || user.rating;

    await user.save();

    res.status(201).json({ message: "Data Updated" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
