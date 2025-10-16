import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("https://trackify-45q3.onrender.com/api/auth/admin/login", {
                username,
                password,
            });
            localStorage.setItem("adminToken", data.token);
            navigate("/admin");
        } catch (err) {
            setError("Invalid credentials or unauthorized access");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
            <form
                onSubmit={handleLogin}
                className="bg-white/10 p-8 rounded-2xl shadow-lg w-80 backdrop-blur-lg"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <input
                    type="text"
                    placeholder="Admin Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full mb-4 px-3 py-2 rounded-lg text-black"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4 px-3 py-2 rounded-lg text-black"
                    required
                />

                <button
                    
                    type="submit"
                    className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all font-semibold"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default AdminLogin;
