const mongoose = require("mongoose");

const parcelSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    courierService: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in transit", "out for delivery", "delivered", "cancelled"],
      default: "pending",
    },
    // 🔹 Instead of storing userId directly, store Wing + Flat No
    wingflatno: {
      type: String,
      required: true,
    },
    // 🔹 New field: when parcel is marked as delivered
    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parcel", parcelSchema);
