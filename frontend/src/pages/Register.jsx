import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left dark sidebar */}
      <div className="w-1/3 bg-stone-900 text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">Routine Manager</h1>
      </div>

      {/* Right light form section */}
      <div className="w-2/3 flex items-center justify-center bg-stone-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full mb-6 px-3 py-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            className="w-full bg-stone-900 text-white py-2 rounded hover:bg-stone-800"
          >
            Register
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
