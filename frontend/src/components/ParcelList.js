import React from "react";
import { updateParcel, deleteParcel } from "../services/parcelService";

const ParcelList = ({ parcels, onRefresh }) => {
  const handleUpdate = async (id) => {
    try {
      await updateParcel(id, { status: "delivered" });
      onRefresh();
    } catch (error) {
      console.error("Error updating parcel:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteParcel(id);
      onRefresh();
    } catch (error) {
      console.error("Error deleting parcel:", error);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-purple-300 border-b border-white/20 pb-2">
        📦 All Parcels
      </h2>

      {parcels.length === 0 ? (
        <p className="text-gray-300 text-center py-8">
          No parcels found. Add one above!
        </p>
      ) : (
        <ul className="space-y-3">
          {parcels.map((p) => (
            <li
              key={p._id}
              className="p-4 rounded-xl bg-black/30 border border-white/20 shadow-md flex justify-between items-center hover:bg-black/40 transition"
            >
              <div className="text-gray-200">
                <span className="font-semibold text-blue-400">
                  {p.trackingId}
                </span>
                <span className="mx-2 text-gray-400">|</span>
                {p.courierService}
                <span className="mx-2 text-gray-400">|</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    p.status === "delivered"
                      ? "bg-green-500/20 text-green-300 border border-green-500/40"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40"
                  }`}
                >
                  {p.status}
                </span>
                <span className="mx-2 text-gray-400">|</span>
                {p.wingflatno}
              </div>
              <div className="space-x-2">
                {p.status !== "delivered" && (
                  <button
                    onClick={() => handleUpdate(p._id)}
                    className="px-3 py-1.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
                  >
                    ✅ Delivered
                  </button>
                )}
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1.5 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ParcelList;
