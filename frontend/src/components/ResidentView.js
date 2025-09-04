import React, { useState } from "react";
import axios from "axios";

const ResidentView = () => {
  const [wingflatno, setWingFlatNo] = useState("");
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!wingflatno.trim()) {
      alert("Please enter your Wing-Flat No.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `http://trackify-production-2a4c.up.railway.app/api/parcels/flat/${wingflatno}`
      );
      setParcels(res.data);
    } catch (err) {
      console.error(err);
      alert("No parcels found or error fetching parcels.");
      setParcels([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#091540] via-gray-900 to-black flex flex-col items-center justify-start pt-20 px-6">
      
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
        📦 Trackify
      </h1>
      <p className="text-gray-300 mb-12 text-center max-w-lg">
        Enter your Wing-Flat number to track your parcels in real-time.
      </p>

      {/* Input + Button */}
      <div className="flex w-full max-w-lg mb-12">
        <input
          type="text"
          placeholder="Wing-Flat No (e.g., A-101)"
          value={wingflatno}
          onChange={(e) => setWingFlatNo(e.target.value.toUpperCase())}
          className="flex-1 px-5 py-3 rounded-l-full bg-white/10 text-white placeholder-gray-400 border border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        <button
          onClick={handleCheck}
          className="px-6 py-3 bg-cyan-600 text-white font-semibold rounded-r-full shadow-lg hover:bg-cyan-500 transition"
        >
          Check
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-gray-300 animate-pulse">Loading parcels...</p>
      ) : parcels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          {parcels.map((p) => (
            <div
              key={p._id}
              className="p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-cyan-500/30 shadow-xl text-gray-100 hover:scale-105 transition-transform"
            >
              <p>
                <span className="font-semibold text-cyan-300">Tracking ID:</span> {p.trackingId}
              </p>
              <p>
                <span className="font-semibold text-blue-400">Courier:</span> {p.courierService}
              </p>
              <p>
                <span className="font-semibold text-teal-300">Status:</span> {p.status}
              </p>
              <p>
                <span className="font-semibold text-white">Received:</span> {new Date(p.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No parcels found.</p>
      )}
    </div>
  );
};

export default ResidentView;
