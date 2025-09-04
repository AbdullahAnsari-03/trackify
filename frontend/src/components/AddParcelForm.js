import React, { useState } from "react";
import { addParcel } from "../services/parcelService";

const AddParcelForm = ({ onParcelAdded }) => {
  const [formData, setFormData] = useState({
    trackingId: "",
    courierService: "",
    wingflatno: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "wingflatno") {
      const normalized = value.toUpperCase().replace(/\s+/g, "");
      setFormData((prev) => ({ ...prev, [name]: normalized }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!formData.trackingId.trim()) return "Tracking ID is required.";
    if (!formData.courierService.trim()) return "Courier service is required.";
    if (!formData.wingflatno.trim()) return "Wing + Flat No is required.";

    const flatPattern = /^[A-Z]-\d{1,4}$/;
    if (!flatPattern.test(formData.wingflatno)) {
      return "Wing + Flat No must look like A-101.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const err = validate();
    if (err) {
      setErrorMsg(err);
      return;
    }

    setLoading(true);
    try {
      await addParcel(formData);
      setSuccessMsg("Parcel added successfully!");
      setFormData({
        trackingId: "",
        courierService: "",
        wingflatno: "",
        status: "pending",
      });
      if (onParcelAdded) await onParcelAdded();
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || "Error adding parcel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl"
    >
      {/* Alerts */}
      {successMsg && (
        <div className="rounded-xl border border-green-500/40 bg-green-500/20 px-4 py-3 text-green-300">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/20 px-4 py-3 text-red-300">
          {errorMsg}
        </div>
      )}

      {/* Tracking ID */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-200">Tracking ID</label>
        <input
          name="trackingId"
          placeholder="e.g., BLU123456789"
          value={formData.trackingId}
          onChange={handleChange}
          required
          className="px-4 py-2.5 rounded-xl border border-white/20 bg-black/30 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Courier Service */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-200">Courier Service</label>
        <input
          name="courierService"
          placeholder="e.g., BlueDart"
          value={formData.courierService}
          onChange={handleChange}
          required
          className="px-4 py-2.5 rounded-xl border border-white/20 bg-black/30 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Wing + Flat No */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-200">Wing + Flat No</label>
        <input
          name="wingflatno"
          placeholder="A-101"
          value={formData.wingflatno}
          onChange={handleChange}
          required
          className="px-4 py-2.5 rounded-xl border border-white/20 bg-black/30 text-gray-100 tracking-wider placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Status */}
      <div className="grid gap-2">
        <label className="text-sm font-medium text-gray-200">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="px-4 py-2.5 rounded-xl border border-white/20 bg-black/30 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="pending">Pending</option>
          <option value="in transit">In Transit</option>
          <option value="out for delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Submit */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={loading}
          className={`px-5 py-2.5 rounded-xl text-white transition-all shadow ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? "Adding..." : "Add Parcel"}
        </button>
      </div>
    </form>
  );
};

export default AddParcelForm;
