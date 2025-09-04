// src/components/Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLaunchApp = true }) => {
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-8 flex justify-between items-center bg-black/30 backdrop-blur-md shadow-md">
      <h1
        className="text-2xl font-bold text-white tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        📦 Trackify
      </h1>
      <nav className="space-x-6">
        <button
          onClick={() => navigate("/")}
          className="text-gray-200 hover:text-white transition"
        >
          Home
        </button>
        {onLaunchApp && (
          <button
            onClick={() => navigate("/app")}
            className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            Launch App
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
