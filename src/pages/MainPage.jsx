import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/Home";
import Contact from "../components/Contact";
import Project from "./../components/Project";
import About from "./../components/About";
import "./../tailwind.css";

const MainPage = () => {
    return (
        <>
            <Navbar/>
            <Home/>
            <Project/>
            <About/>
            <Contact/>
        </>
    );
};

export default MainPage;