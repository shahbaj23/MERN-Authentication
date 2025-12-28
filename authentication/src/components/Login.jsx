import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const currentRef = useRef(null)

  const {login} = useContext(AuthContext)

  useEffect(()=>{
    currentRef.current.focus()
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = { email, password };

    const res = await login(formData)

    if(res.success){
      toast.success("Login Successfully")
    } else{
      toast.error(res.message)
    }

    console.log(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-700 to-green-900">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-xl">
        <h1 className="text-center text-3xl font-bold text-white mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-white text-sm mb-1 block">
              Email
            </label>
            <input
              ref={currentRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-md outline-none bg-white text-gray-800 focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="text-white text-sm mb-1 block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 rounded-md outline-none bg-white text-gray-800 focus:ring-2 focus:ring-green-500"
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

          <button
            type="submit"
            className="mt-2 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-2 rounded-md transition"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-white text-sm mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-300 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
