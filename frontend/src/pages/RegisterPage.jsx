import React, { useState } from "react";
import axios from "axios";
import AuthLayout from "../components/Auth/AuthLayout";
import InputField from "../components/Form/InputField";
import FeedbackMessage from "../components/Feedback/FeedbackMessage";
import PrimaryButton from "../components/Buttons/PrimaryButton";
import RoleToggle from "../components/Buttons/RoleToggle";

export default function Register() {
  const [role, setRole] = useState("user");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false); // show/hide state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setErrorMsg("");
  setSuccessMsg("");

  const nameRegex = /^[a-zA-Z\s]{2,40}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!nameRegex.test(formData.name)) {
    setErrorMsg("Name should only contain letters and spaces (2–40 characters).");
    setLoading(false);
    return;
  }

  if (!emailRegex.test(formData.email)) {
    setErrorMsg("Please enter a valid email address.");
    setLoading(false);
    return;
  }

  if (!passwordRegex.test(formData.password)) {
    setErrorMsg(
      "Password must be at least 8 characters and include an uppercase letter, lowercase letter, number, and special character."
    );
    setLoading(false);
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      ...formData,
      role,
    });

    if (res.data.success) {
      setSuccessMsg("Registration successful! Redirecting to login...");
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => window.location.href = "/login", 2000);
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
    <AuthLayout
      title="Create your JobFinder account"
      description="Sign up to search for jobs, connect with employers, or post job listings. Choose your role to get started."
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center font-[Outfit]">Register Now</h2>

      <RoleToggle role={role} setRole={setRole} />

      <FeedbackMessage type="error" message={errorMsg} />
      <FeedbackMessage type="success" message={successMsg} />

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <InputField
          label="Name"
          id="name"
          placeholder="Enter your name"
          required
          value={formData.name}
          onChange={handleChange}
          hint="Only letters and spaces, 2–40 characters."
        />

        <InputField
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={handleChange}
          hint="Valid email format (e.g., name@example.com)."
        />

        {/* Password with show/hide toggle */}
        <div className="relative">
          <InputField
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            required
            hint="At least 8 characters, including uppercase, lowercase, number, and special character."
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

        <PrimaryButton loading={loading}>Sign Up</PrimaryButton>
      </form>

      <p className="mt-6 text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-[#5d4037] hover:underline font-medium">Sign in</a>
      </p>
    </AuthLayout>
  );
}
