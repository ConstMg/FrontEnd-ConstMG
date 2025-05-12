import { useEffect, useState } from "react";
import gambarBg from "./../assets/rumah-crop.png";
import "./../tailwind.css";

import Typewriter from "typewriter-effect";
const Home = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.02;
      const y = (e.clientY - window.innerHeight / 2) * 0.02;
      setOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <>
      <div className="home h-dvh relative" id="main">
        <img
          src={gambarBg}
          className="absolute h-5/6 right-[-15px] bottom-0  transition-transform duration-75 ease-out pointer-events-none"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
          }}
          alt="rumah"
        />
        <div className="text-space absolute h-full w-full md:w-1/2 flex flex-col justify-center items-start gap-4 px-6 py-12 md:p-20">
  <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-400 font-bold leading-tight">
    <Typewriter
      options={{
        strings: ["Make Your Dream House Come True."],
        autoStart: true,
        loop: true,
      }}
    />
  </p>

  <p className="text-base sm:text-lg md:text-xl text-gray-700">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    ad minim veniam
  </p>

  <div className="h-[48px] inline-block">
    <button
      className="absolute cursor-pointer transition-all bg-amber-400 text-white px-6 py-2 rounded-lg border-amber-500 
      border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
      active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
    >
      Explore it
    </button>
  </div>
</div>

      </div>
    </>
  );
};

export default Home;
