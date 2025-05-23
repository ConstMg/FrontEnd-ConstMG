import React, { useState } from "react";
import { motion } from "framer-motion";
import gambarBangunan from "./../assets/const.png";
import Navbar from "./../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import Typewriter from "typewriter-effect";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { isLoading, handleLogin } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    // Variants untuk animasi framer-motion
    const imageVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8 },
        },
    };

    const buttonVariants = {
        idle: { scale: 1 },
        loading: {
            scale: [1, 1.1, 1],
            transition: { repeat: Infinity, duration: 1.2 },
        },
    };

    return (
        <>
            <Navbar />
            <div className="h-[80px]" />
            <div className=" min-h-screen bg-gradient-to-r from-orange-100 via-orange-200 to-amber-200 flex justify-center items-center px-4">
                <div className="bg-white/50 shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden w-full max-w-5xl">
                    {/* Image Section */}
                    <motion.div
                        className="hidden md:block md:w-1/2 relative"
                        variants={imageVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <img
                            src={gambarBangunan}
                            alt="Gambar Bangunan"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-start justify-start">
                            <p className="text-white text-3xl md:text-4xl font-bold p-6 text-left">
                                <Typewriter
                                    options={{
                                        strings: [
                                            "Make Your Dream House Come True.",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </p>
                        </div>
                    </motion.div>

                    {/* Form Section */}
                    <motion.div
                        className="w-full md:w-1/2 px-6 py-10 md:px-10 flex flex-col justify-center"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="text-center mb-6">
                            <p className="text-amber-500 text-2xl font-bold">
                                PT Murgung Nusa Parama
                            </p>
                            <p className="text-gray-700 text-xl mt-2">
                                Welcome Back 👋
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5 w-full"
                        >
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label
                                    htmlFor="password"
                                    className="block mb-1 text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-2 rounded-full border-2 border-gray-300 pr-16 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword((prev) => !prev)
                                    }
                                    className="absolute right-4 top-7 text-blue-500 text-xl md:text-2xl"
                                    aria-label="Toggle Password Visibility"
                                >
                                    {showPassword ? "🙈" : "🙉"}
                                </button>
                            </div>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                variants={buttonVariants}
                                animate={isLoading ? "loading" : "idle"}
                                className={`
        w-full px-6 py-2 rounded-full text-white font-semibold transition-all
        ${
            isLoading
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-amber-400 hover:bg-amber-500 hover:brightness-110"
        }
        ${
            !isLoading
                ? "hover:-translate-y-[1px] hover:border-b-[6px] active:translate-y-[2px] active:brightness-90 active:border-b-[2px]"
                : ""
        }
        border-b-[4px] border-amber-500
        cursor-${isLoading ? "not-allowed" : "pointer"}
    `}
                                onClick={(e) => {
                                    // Tambahan keamanan agar tidak bisa diklik ulang via JS
                                    if (isLoading) e.preventDefault();
                                }}
                            >
                                {isLoading ? "Loading..." : "Sign In"}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Login;
