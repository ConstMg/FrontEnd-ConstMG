import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/Home";
import Contact from "../components/Contact";
import Project from "./../components/Project";
import About from "./../components/About";
import "./../tailwind.css";
// import { ToastContainer } from "react-toastify";

const MainPage = () => {
  return (
    <>
      {/* <ToastContainer position="top-right" autoClose={3000} />; */}
      <Navbar />
      <Home />
      <Project />
      <About />
      <Contact />
    </>
  );
};

export default MainPage;
