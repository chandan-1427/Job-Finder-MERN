import React, { useState } from "react";
import axios from "axios";
import InputField from "../components/Form/InputField";
import FeedbackMessage from "../components/Feedback/FeedbackMessage";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);

      if (res.data.success) {
        setSuccessMsg("Login successful!");

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
          })
        );

        setTimeout(() => {
          if (res.data.role === "admin") {
            window.location.replace("/admin");
          } else if (res.data.role === "user") {
            window.location.replace("/user-profile");
          } else if (res.data.role === "employer") {
            window.location.replace("/employer-profile");
          } else {
            window.location.replace("/");
          }
        }, 200);
      } else {
        setErrorMsg(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5d4037] to-[#4e342e] px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg font-[Outfit]">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="JobFinder Logo"
            className="w-16 h-16 mb-2"
          />
          <h1 className="text-lg font-semibold text-[#5d4037] text-center">
            Welcome back to <span className="text-[#4e342e]/80">JobFinder</span>
          </h1>
          <p className="text-sm text-gray-600 text-center mt-1">
            Log in to continue your journey and explore new opportunities tailored for you.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center font-serif">
          Welcome Back!
        </h2>

        <FeedbackMessage type="error" message={errorMsg} />
        <FeedbackMessage type="success" message={successMsg} />

        <form className="space-y-4 md:space-y-5" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Field with "Show"/"Hide" Text Toggle */}
          <div className="relative">
            <InputField
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-sm text-[#5d4037] hover:underline focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5d4037] text-white py-2 md:py-3 rounded-md font-medium transition duration-300 hover:bg-[#4e342e] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5d4037]/50 disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-[#5d4037] hover:underline font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
