// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard"; // ✅ Import new admin page

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page (no navbar here) */}
        <Route path="/" element={<LandingPage />} />

        {/* Dashboard Page */}
        <Route
          path="/app"
          element={
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                <Dashboard />
              </main>
            </div>
          }
        />

        {/* Admin Dashboard Page */}
        <Route
          path="/admin"
          element={
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                <AdminDashboard />
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
