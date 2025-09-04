const express = require("express");
const router = express.Router();
const Parcel = require("../models/Parcel");

// @desc   Add new parcel
// @route  POST /api/parcels
router.post("/", async (req, res) => {
  try {
    const { trackingId, courierService, status, wingflatno } = req.body;

    const parcel = await Parcel.create({
      trackingId,
      courierService,
      status,
      wingflatno, // 👈 Save wingflatno instead of userId
    });

    res.status(201).json(parcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc   Get all parcels
// @route  GET /api/parcels
router.get("/", async (req, res) => {
  try {
    const parcels = await Parcel.find();
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update parcel (status, handedTo, photo, etc.)
router.put("/:id", async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.json(parcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ✅ Delete parcel
router.delete("/:id", async (req, res) => {
  try {
    const parcel = await Parcel.findByIdAndDelete(req.params.id);
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.json({ message: "Parcel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc   Get parcels by wingflatno
// @route  GET /api/parcels/flat/:wingflatno
router.get("/flat/:wingflatno", async (req, res) => {
  try {
    const { wingflatno } = req.params;
    const parcels = await Parcel.find({ wingflatno });
    if (parcels.length === 0) {
      return res.status(404).json({ message: "No parcels found for this flat." });
    }
    res.json(parcels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Update parcel (status, handedTo, etc.)
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If status is set to delivered, record timestamp
    if (req.body.status === "delivered") {
      updateData.deliveredAt = new Date();
    }

    const parcel = await Parcel.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!parcel) return res.status(404).json({ message: "Parcel not found" });
    res.json(parcel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /api/parcels/analytics
// Returns overall counts, today/month counts and small breakdowns (courier + last 7 days)
router.get("/analytics", async (req, res) => {
  try {
    const now = new Date();
    // start of today (server local time)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // start of this month
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // start of last 7 days (inclusive)
    const start7Days = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);

    // Basic counts
    const total = await Parcel.countDocuments();
    const delivered = await Parcel.countDocuments({ status: "delivered" });
    const pending = await Parcel.countDocuments({ status: "pending" });
    const inTransit = await Parcel.countDocuments({ status: { $in: ["in transit", "out for delivery"] } });

    // Time-windowed counts
    const todayAdded = await Parcel.countDocuments({ createdAt: { $gte: startOfToday } });
    const todayDelivered = await Parcel.countDocuments({ deliveredAt: { $gte: startOfToday } });

    const monthAdded = await Parcel.countDocuments({ createdAt: { $gte: startOfMonth } });
    const monthDelivered = await Parcel.countDocuments({ deliveredAt: { $gte: startOfMonth } });

    // Breakdown by courierService
    const courierAgg = await Parcel.aggregate([
      { $group: { _id: "$courierService", count: { $sum: 1 } } },
    ]);
    const courierBreakdown = {};
    courierAgg.forEach((c) => { courierBreakdown[c._id || "Unknown"] = c.count; });

    // Last 7 days added (group by date YYYY-MM-DD)
    const createdLast7Agg = await Parcel.aggregate([
      { $match: { createdAt: { $gte: start7Days } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    // normalize to full 7-day series
    const last7Days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start7Days.getFullYear(), start7Days.getMonth(), start7Days.getDate() + i);
      const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
      const found = createdLast7Agg.find((x) => x._id === key);
      last7Days.push({ date: key, count: found ? found.count : 0 });
    }

    return res.json({
      total,
      delivered,
      pending,
      inTransit,
      todayAdded,
      todayDelivered,
      monthAdded,
      monthDelivered,
      courierBreakdown,
      last7Days, // array of {date, count} for the last 7 days
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
