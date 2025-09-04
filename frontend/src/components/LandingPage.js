import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 py-8">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg max-w-4xl leading-tight opacity-0 animate-fade-in-down">
          Seamless Parcel Tracking for Your Society
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed opacity-0 animate-fade-in-down animation-delay-200">
          Trackify helps societies and residential complexes manage parcel deliveries
          effortlessly. Guards can log new parcels, and residents can track them in
          real time — all from one modern app.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-5xl w-full">
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg opacity-0 animate-fade-in-up animation-delay-400">
            <h3 className="font-semibold text-lg text-blue-300">📋 Easy Logging</h3>
            <p className="text-gray-200 mt-2">
              Guards can quickly add parcel details with just a few clicks.
            </p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg opacity-0 animate-fade-in-up animation-delay-600">
            <h3 className="font-semibold text-lg text-green-300">👨‍👩‍👧 Resident View</h3>
            <p className="text-gray-200 mt-2">
              Residents can check their parcels anytime, anywhere.
            </p>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg opacity-0 animate-fade-in-up animation-delay-800">
            <h3 className="font-semibold text-lg text-cyan-300">⚡ Real-Time</h3>
            <p className="text-gray-200 mt-2">
              Updates reflect instantly without refreshing the page.
            </p>
          </div>
        </div>

        {/* Launch Button */}
        <button
          onClick={() => navigate("/app")}
          className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-base sm:text-lg md:text-xl font-semibold rounded-xl shadow-xl hover:from-indigo-600 hover:to-blue-700 transition-all transform hover:scale-105 opacity-0 animate-fade-in-up animation-delay-1000"
        >
          🚀 Launch App
        </button>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-black/30 backdrop-blur-md border-t border-white/10 flex flex-col sm:flex-row justify-between items-center px-6 sm:px-12 text-gray-400 text-sm space-y-2 sm:space-y-0">
        {/* Left Side */}
        <div className="text-center sm:text-left">
          © 2025 Trackify. Deliveries simplified.
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center sm:justify-end space-x-4">
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

      {/* Tailwind Animations */}
      <style>
        {`
          .animate-fade-in-down {
            animation: fadeInDown 1s forwards;
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s forwards;
          }
          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-400 { animation-delay: 0.4s; }
          .animation-delay-600 { animation-delay: 0.6s; }
          .animation-delay-800 { animation-delay: 0.8s; }
          .animation-delay-1000 { animation-delay: 1s; }

          @keyframes fadeInDown {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default LandingPage;
