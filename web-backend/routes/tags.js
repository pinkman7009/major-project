const express = require("express");
const router = express.Router();
const Tags = require("../models/Tags");
const { protect, authorize } = require("../middleware/auth");

router.get("/", protect, authorize(0, 1), async (req, res) => {
  try {
    const tags = await Tags.find();

    res.status(200).json(tags);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

router.post("/", protect, authorize(0, 1), async (req, res) => {
  try {
    const { title } = req.body;

    let tags = new Tags({
      title,
    });

    await tags.save();

    res.status(201).json(tags);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
