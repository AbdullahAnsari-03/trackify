import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddParcelForm from "./AddParcelForm";
import ParcelList from "./ParcelList";
import ResidentView from "./ResidentView";
import { getParcels } from "../services/parcelService";

function Dashboard() {
  const [view, setView] = useState("admin");
  const [parcels, setParcels] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu
  const navigate = useNavigate();

  const fetchParcels = async () => {
    try {
      const data = await getParcels();
      setParcels(data);
    } catch (error) {
      console.error("Error fetching parcels:", error);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-gray-200 font-sans flex flex-col">
      
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-md border-b border-white/10 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide drop-shadow-md">📦 Trackify</h1>

          {/* Hamburger button for mobile */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-cyan-600 text-white shadow-md hover:bg-cyan-500 transition-all text-sm sm:text-base"
            >
              Home
            </Link>
            <button
              className={`px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${
                view === "admin"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 hover:bg-white/20"
              }`}
              onClick={() => setView("admin")}
            >
              Guard Dashboard
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all text-sm sm:text-base ${
                view === "resident"
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 hover:bg-white/20"
              }`}
              onClick={() => setView("resident")}
            >
              Resident View
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-all text-sm sm:text-base"
              onClick={() => navigate("/admin")}
            >
              Admin Dashboard
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden bg-black/40 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-cyan-600 text-white shadow-md hover:bg-cyan-500 transition-all text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <button
              className={`px-4 py-2 rounded-lg transition-all text-sm ${
                view === "admin"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 hover:bg-white/20"
              }`}
              onClick={() => { setView("admin"); setMenuOpen(false); }}
            >
              Guard Dashboard
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-all text-sm ${
                view === "resident"
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 hover:bg-white/20"
              }`}
              onClick={() => { setView("resident"); setMenuOpen(false); }}
            >
              Resident View
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-lg hover:bg-blue-500 transition-all text-sm"
              onClick={() => { navigate("/admin"); setMenuOpen(false); }}
            >
              Admin Dashboard
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 sm:space-y-8">
        {view === "admin" && (
          <div className="space-y-6 sm:space-y-8">
            <section className="p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-blue-300">
                ➕ Add New Parcel
              </h2>
              <AddParcelForm onParcelAdded={fetchParcels} />
            </section>
            <section className="p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
              <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-purple-300">
                📋 All Parcels
              </h2>
              <ParcelList parcels={parcels} onRefresh={fetchParcels} />
            </section>
          </div>
        )}
        {view === "resident" && (
          <section className="p-4 sm:p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl">
            <ResidentView />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 bg-black/30 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 md:px-12 text-gray-400 text-sm space-y-2 sm:space-y-0">
        <div className="text-center sm:text-left">
          © 2025 Trackify. Deliveries simplified.
        </div>
        <div className="flex items-center justify-center sm:justify-end space-x-4">
          <span>Developed by Abdullah Ansari</span>
          <a
            href="https://www.linkedin.com/in/abdullah-ansari-1b2644274"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.25c.694-.832 1.705-1.25 2.5-1.25 2.071 0 3.5 1.679 3.5 3.75v6.25z"/>
            </svg>
          </a>
          <a
            href="https://github.com/AbdullahAnsari-03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.604-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.921.43.37.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
