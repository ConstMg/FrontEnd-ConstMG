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
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userEmail", email);
        
        // Navigate to home page
        navigate("/");
    };

    // Check if user is already logged in
    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("isLoggedIn");
        if (isLoggedIn) {
            navigate("/");
            sessionStorage.setItem("isLoggedIn", "false");
        }
    }, [navigate]);

    return (
        <div className="relative h-dvh flex flex-col justify-center items-center">
            <Navbar/>
            <div className="container w-3/4 flex flex-row h-8/12 rounded-4xl">
                <div className="image relative w-1/3">
                    <img className="h-full" src={gambarBangunan} alt="gambar bangunan" />
                    <p className="absolute w-full left-1/2 transform -translate-x-1/2 top-0 p-2 text-5xl text-white font-bold">Make Your Dream House Come True.</p>
                </div>
                <div className="form bg-white w-2/3 flex flex-col justify-between items-center px-8 py-20">
                    <p className="text-amber-300 text-2xl font-bold">PT Murgung Nusa Parama</p>
                    <p className="text-2xl font-medium">Welcome Back👋</p>
                    <form action="" className="flex flex-col justify-center items-center gap-4 w-3/4" onSubmit={handleSubmit}>
                        <div className="w-3/4 flex flex-col items-start">
                            <label htmlFor="email">Email</label>
                            <input
                                className="w-full border-2 border-gray-300 rounded-full p-2"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required/> 
                        </div>
                        
                        <div className="w-3/4 flex flex-col items-start">
                            <label htmlFor="password">Password</label>
                            <input
                                className="w-full border-2 border-gray-300 rounded-full p-2"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required/>
                        </div>
                        <input className="w-3/4 rounded-full bg-amber-300 text-white font-bold p-2" type="submit" value="Sign In" />
                    </form>
                </div>
            </div>
        </div>
        
    );
};

export default Login;