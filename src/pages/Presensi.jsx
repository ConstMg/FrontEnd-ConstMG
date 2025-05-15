import React, { useState } from "react";
import Navbar from "./../components/Navbar";
import Home from "./../components/Home";
import Contact from "../components/Contact";
import Project from "./../components/Project";
import About from "./../components/About";
import "./../tailwind.css";
import PresensiKaryawan from "../components/PresensiKaryawan";

const Presensi = () => {
  

  return (
    <>
      <Navbar />
      <PresensiKaryawan />
    </>
  );
};

export default Presensi;
