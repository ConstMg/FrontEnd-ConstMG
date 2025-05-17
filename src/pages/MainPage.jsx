import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/Home";
import Contact from "../components/Contact";
import Project from "./../components/Project";
import About from "./../components/About";
import { ProfileProvider } from "../context/ProfileContext";
import "./../tailwind.css";
// import { ToastContainer } from "react-toastify";

const MainPage = () => {
  return (
    <ProfileProvider>
      <Navbar />
      <Home />
      <Project />
      <About />
      <Contact />
    </ProfileProvider>
  );
};

export default MainPage;
