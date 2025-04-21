import React, { useState } from "react";
import gambarBg from "./../assets/rumah-crop.png";
import { Link } from "react-router-dom";
import Navbar from "./../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./../tailwind.css";

const Home = () => {
    
    return (
        <>
            <Navbar/>
            <div className="home h-dvh relative">
                <img src={gambarBg} className="absolute h-full right-0 bottom-0" />
                <div className="text-space absolute h-full w-1/2 flex flex-col justify-center items-start gap-4 p-20">
                    <p className="text-6xl text-amber-400 font-bold">Make Your Dream House Come True.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                    <button className="px-8 py-4 bg-amber-400 rounded-2xl text-xl text-white font-bold">Explore it</button>
                </div>
            </div>
            <div className="project bg-red h-dvh"></div>
            <div className="about bg-red h-dvh"></div>
            <div className="contact bg-red h-dvh"></div>
        </>
    );
};

export default Home;