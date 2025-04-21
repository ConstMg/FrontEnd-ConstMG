import React, { useState } from "react";
import gambarBg from "./../assets/rumah-crop.png";
import "./../tailwind.css";

const Home = () => {
    return (
        <>
            <div className="home h-dvh relative" id="main">
                <img src={gambarBg} className="absolute h-5/6 right-0 bottom-0" />
                <div className="text-space absolute h-full w-1/2 flex flex-col justify-center items-start gap-4 p-20">
                    <p className="text-6xl text-amber-400 font-bold">Make Your Dream House Come True.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
                    <button className="px-8 py-4 bg-amber-400 rounded-2xl text-xl text-white font-bold">Explore it</button>
                </div>
            </div>
        </>
    );
};

export default Home;