import React, { useState, useEffect } from "react";
import gambarBangunan from "./../assets/const.png";
import { Link } from "react-router-dom";
import Navbar from "./../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./../tailwind.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
      return;
    }

    // Set session storage when login is successful
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "karyawan");
    localStorage.setItem("userEmail", email);

    // Navigate to home page
    localStorage.getItem("userRole") === "admin"
      ? navigate("/admin")
      : navigate("/presensi");
    // navigate("/");
  };

  return (
    <div className="relative h-dvh flex flex-col justify-center items-center">
      <Navbar />
      <div className="container w-3/4 h-6/10 flex flex-row justify-center rounded-4xl">
        <div className="image relative w-1/3 md:block hidden">
          <img className="h-full" src={gambarBangunan} alt="gambar bangunan" />
          <p className="absolute w-full left-1/2 transform -translate-x-1/2 top-0 p-2 text-5xl text-white font-bold">
            Make Your Dream House Come True.
          </p>
        </div>
        <div className="form bg-white w-full md:w-2/3 flex flex-col justify-between items-center px-6 md:px-8 py-20 md:py-20 shadow-lg rounded-lg">
          <p className="text-amber-300 text-xl md:text-2xl font-bold text-center">
            PT Murgung Nusa Parama
          </p>
          <p className="text-lg md:text-2xl font-medium text-center mb-6">
            Welcome Back 👋
          </p>
          <form
            className="flex flex-col justify-center items-center gap-4 w-full md:w-3/4"
            onSubmit={handleSubmit}
          >
            <div className="w-5/6 md:w-3/4 flex flex-col items-start">
              <label htmlFor="email" className="text-sm md:text-base">
                Email
              </label>
              <input
                className="w-full border-2 border-gray-300 rounded-full p-2"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="w-5/6 md:w-3/4 flex flex-col items-start">
              <label htmlFor="password" className="text-sm md:text-base">
                Password
              </label>
              <input
                className="w-full border-2 border-gray-300 rounded-full p-2"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <input
              className="w-5/6 md:w-3/4 rounded-full bg-amber-300 text-white font-bold p-2 mt-2 cursor-pointer transition hover:bg-amber-400"
              type="submit"
              value="Sign In"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
