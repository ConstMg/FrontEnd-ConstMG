import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/Home";
import Contact from "../components/Contact";
import Project from "./../components/Project";
import About from "./../components/About";
import { Provider } from "../context/Context";
import "./../tailwind.css";
// import { ToastContainer } from "react-toastify";

const MainPage = () => {
    return (
        <div className="mainPage bg-gradient-to-r from-orange-100 via-orange-200 to-amber-200">
            <Provider>
                <Navbar />
                <Home />
                <Project />
                <About />
                <Contact />
            </Provider>
        </div>
    );
};

export default MainPage;
