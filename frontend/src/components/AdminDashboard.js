// src/components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/parcels/analytics");
      setStats(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 bg-gradient-to-br from-[#091540] via-gray-900 to-black">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#091540] via-gray-900 to-black text-gray-100">
      
      {/* Main content */}
      <div className="flex-grow p-8">
        {/* Header */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold drop-shadow-lg mb-2">📊 Admin Dashboard</h1>
          <p className="text-gray-300">Overview of parcel activity</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Parcels", value: stats.total, color: "text-cyan-400" },
            { label: "Delivered", value: stats.delivered, color: "text-green-400" },
            { label: "Pending", value: stats.pending, color: "text-yellow-400" },
            { label: "In Transit", value: stats.inTransit, color: "text-blue-400" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-cyan-500/20 shadow-lg hover:scale-105 transition-transform"
            >
              <h2 className="text-gray-400 text-sm">{stat.label}</h2>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Today & Month Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            { title: "📅 Today", added: stats.todayAdded, delivered: stats.todayDelivered },
            { title: "🗓️ This Month", added: stats.monthAdded, delivered: stats.monthDelivered },
          ].map((stat) => (
            <div
              key={stat.title}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-cyan-500/20 shadow-lg hover:scale-105 transition-transform"
            >
              <h2 className="text-lg font-semibold mb-4 text-cyan-300">{stat.title}</h2>
              <p className="mb-2">
                Added: <span className="font-bold text-white">{stat.added}</span>
              </p>
              <p>
                Delivered: <span className="font-bold text-white">{stat.delivered}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Courier Breakdown */}
        <div className="bg-white/5 backdrop-blur-lg border border-cyan-500/20 shadow-lg rounded-2xl p-6 mt-10 hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold mb-4 text-cyan-300">🚚 Courier Breakdown</h2>
          <ul className="space-y-2">
            {Object.entries(stats.courierBreakdown).map(([courier, count]) => (
              <li key={courier} className="flex justify-between text-gray-300">
                <span>{courier}</span>
                <span className="font-bold text-white">{count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Last 7 Days */}
        <div className="bg-white/5 backdrop-blur-lg border border-cyan-500/20 shadow-lg rounded-2xl p-6 mt-10 hover:scale-105 transition-transform">
          <h2 className="text-lg font-semibold mb-4 text-cyan-300">📈 Last 7 Days</h2>
          <div className="grid grid-cols-7 gap-4 text-center">
            {stats.last7Days.map((day) => (
              <div key={day.date} className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition">
                <p className="text-xs text-gray-400">
                  {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                </p>
                <p className="text-lg font-bold text-white">{day.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 bg-black/30 backdrop-blur-md border-t border-white/10 flex justify-between items-center px-6 text-gray-400 text-sm">
        {/* Left */}
        <div>
          © {new Date().getFullYear()} Trackify. Deliveries simplified.
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <span>Developed by Abdullah Ansari</span>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/abdullah-ansari-1b2644274"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.966 0-1.75-.783-1.75-1.75s.784-1.75 1.75-1.75 1.75.783 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.379-1.121-2.5-2.5-2.5s-2.5 1.121-2.5 2.5v5.5h-3v-10h3v1.25c.694-.832 1.705-1.25 2.5-1.25 2.071 0 3.5 1.679 3.5 3.75v6.25z" />
            </svg>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/AbdullahAnsari-03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.776.418-1.305.762-1.604-2.665-.3-5.466-1.334-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.289-1.552 3.295-1.23 3.295-1.23.653 1.653.242 2.873.119 3.176.77.84 1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.921.43.37.823 1.102.823 2.222v3.293c0 .319.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default AdminDashboard;
