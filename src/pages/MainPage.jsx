import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/Home";
import Project from "./../components/Project";
import "./../tailwind.css";

const MainPage = () => {
    return (
        <>
            <Navbar/>
            <Home/>
            <Project/>
        </>
    );
};

export default MainPage;