import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/Home";
import Contact from "../components/Contact";
import Project from "./../components/Project";
import About from "./../components/About";
import Services from "../components/Services";
import { Provider } from "../context/Context";
import "./../tailwind.css";
import VisiMisi from "../components/VisiMisi";
import Footer from "../components/Footer";
import Map from "../components/Map";
import OurClients from "../components/OurClients";
import WhyChooseUs from "../components/WhyChooseUs";
import Header from "../components/Header";

const MainPage = () => {
    return (
        <div className="mainPage">
            <Provider>
                <Navbar />
                <Header />
                <Home />
                <VisiMisi />
                <OurClients />
                <Project />
                <About />
                <Services />
                <WhyChooseUs />
                <Contact />
                <Map />
                <Footer />
            </Provider>
        </div>
    );
};

export default MainPage;
