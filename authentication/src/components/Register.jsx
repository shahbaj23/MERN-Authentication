import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {register} = useContext(AuthContext);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = { username, email, password, confirmPassword };

  const res = await register(formData);

  if (res.success) {
    toast.success(res.message);
  } else {
    toast.error(res.message);   
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-800 to-teal-900">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-white mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-3 py-2 rounded-md bg-white outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-md bg-white outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full px-3 py-2 rounded-md bg-white outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-white text-sm mb-1 block">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-3 py-2 rounded-md bg-white outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Error */}
          {/* {error && (
            <p className="text-red-300 text-sm text-center">{error}</p>
          )} */}

          {/* Button */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 rounded-md transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-white text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-green-300 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
