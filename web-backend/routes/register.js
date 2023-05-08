const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const {
    name,
    email,
    password,
    date_of_birth,
    phone_number,
    gender,
    role,
    barID,
  } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ msg: "Email id or phone number already used" });
    }

    user = new User({
      name,
      email,
      password,
      date_of_birth,
      phone_number,
      gender,
      role,
      barID,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
