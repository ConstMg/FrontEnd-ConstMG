import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../public/logo.svg";
import { useAuth } from "../hooks/useAuth";

// Add icons to the library
library.add(faBars, faXmark);

function Navbar() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const hideMidOn = ["/login", "/presensi", "/admin", "/project"];
    const user = localStorage.getItem("userRole");

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
    };

    return (
        <nav className="navbar w-full fixed top-0 flex justify-between items-center p-4 text-2xl font-bold z-10 bg-gradient-to-b from-slate-200/70 to-slate-50/45">
            {/* Logo */}
            <div className="left">
                <NavLink
                    to="/main"
                    className="text-amber-400 hover:cursor-pointer"
                >
                    <img src={Logo} alt="Logo" className="w-30" />
                </NavLink>
            </div>

            {/* Desktop menu */}
            {!hideMidOn.includes(location.pathname) && (
                <div className="mid font-normal hidden md:block">
                    <ul className="flex flex-row justify-between items-center gap-4">
                        <Link
                            to="main"
                            className="hover:cursor-pointer hover:font-bold"
                        >
                            Home
                        </Link>
                        <Link
                            to="project"
                            className="hover:cursor-pointer hover:font-bold"
                        >
                            Project
                        </Link>
                        <Link
                            to="about"
                            className="hover:cursor-pointer hover:font-bold"
                        >
                            About
                        </Link>
                        <Link
                            to="contact"
                            className="hover:cursor-pointer hover:font-bold"
                        >
                            Contact
                        </Link>
                        {isLoggedIn &&
                            (user === "karyawan" || user === "admin") && (
                                <NavLink
                                    to="/presensi"
                                    className="hover:cursor-pointer hover:font-bold"
                                >
                                    Presensi
                                </NavLink>
                            )}
                    </ul>
                </div>
            )}

            {/* Mobile hamburger icon */}
            {!hideMidOn.includes(location.pathname) && (
                <div className="md:hidden">
                    <button onClick={toggleMenu} aria-label="Toggle menu">
                        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
                    </button>
                </div>
            )}

            {/* Right section */}
            <div className="right hidden md:flex flex-row justify-between items-center gap-4">
                {location.pathname !== "/login" ? (
                    !isLoggedIn ? (
                        <NavLink to="/login" className="hover:cursor-pointer">
                            Login
                        </NavLink>
                    ) : (
                        <>
                            {isLoggedIn &&
                                user === "admin" &&
                                location.pathname !== "/admin" && (
                                    <NavLink
                                        to="/admin"
                                        className="hover:cursor-pointer hover:font-bold"
                                    >
                                        Dashboard
                                    </NavLink>
                                )}
                            <NavLink
                                // to="/login"
                                onClick={handleLogout}
                                className="flex md:flex hover:cursor-pointer"
                            >
                                Logout
                            </NavLink>
                        </>
                    )
                ) : (
                    <NavLink
                        to="/"
                        // onClick={handleLogout}
                        className="hover:cursor-pointer"
                    >
                        Home
                    </NavLink>
                )}
            </div>

            {/* Mobile menu dropdown */}
            {menuOpen && (
                <div
                    className={`fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg px-6 py-8 z-50 transform transition-transform duration-300 ease-in-out ${
                        menuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <ul className="flex flex-col gap-4">
                        {!hideMidOn.includes(location.pathname) ? (
                            <>
                                <Link
                                    to="main"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:font-bold cursor-pointer"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="project"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:font-bold cursor-pointer"
                                >
                                    Project
                                </Link>
                                <Link
                                    to="about"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:font-bold cursor-pointer"
                                >
                                    About
                                </Link>
                                <Link
                                    to="contact"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:font-bold cursor-pointer"
                                >
                                    Contact
                                </Link>
                                {isLoggedIn &&
                                    (user === "karyawan" ||
                                        user === "admin") && (
                                        <NavLink
                                            to="/presensi"
                                            className="hover:cursor-pointer hover:font-bold"
                                        >
                                            Presensi
                                        </NavLink>
                                    )}
                            </>
                        ) : (
                            <NavLink
                                to="/"
                                // onClick={() => {
                                //   handleLogout();
                                //   setMenuOpen(false);
                                // }}
                                className="hover:font-bold cursor-pointer"
                            >
                                Home
                            </NavLink>
                        )}
                        {isLoggedIn &&
                            user === "admin" &&
                            location.pathname !== "/admin" && (
                                <NavLink
                                    to="/admin"
                                    className="hover:cursor-pointer hover:font-bold"
                                >
                                    Dashboard
                                </NavLink>
                            )}

                        {location.pathname !== "/login" &&
                            (!isLoggedIn ? (
                                <NavLink
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="hover:font-bold"
                                >
                                    Login
                                </NavLink>
                            ) : (
                                <NavLink
                                    // to="/login"
                                    onClick={handleLogout}
                                    className="hover:font-bold"
                                >
                                    Logout
                                </NavLink>
                            ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
