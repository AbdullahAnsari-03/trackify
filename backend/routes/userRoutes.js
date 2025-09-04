const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Parcel = require("../models/Parcel");


// POST: Add user
router.post("/", async (req, res) => {
  try {
    const { name, wingflatno, phone, role } = req.body; // 👈 only wingflatno now

    const user = new User({
      name,
      wingflatno,  // 👈 consistent
      phone,
      role
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET users (all or by wingflatno)
router.get("/", async (req, res) => {
  try {
    const { wingflatno } = req.query;
    const filter = {};

    if (wingflatno) {
      filter.wingflatno = wingflatno.toUpperCase(); // exact match, case-insensitive via normalization
    }

    const users = await User.find(filter);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;