import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faCartShopping,
    faClockRotateLeft,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";
import { NavLink, useLocation } from "react-router-dom";

// Add icons to the library
library.add(faCartShopping, faClockRotateLeft, faUser);

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Check if user is logged in when component mounts
        const loggedInStatus = sessionStorage.getItem("isLoggedIn");
        if (loggedInStatus) {
            setIsLoggedIn(JSON.parse(loggedInStatus));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("userEmail");
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar w-full fixed top-0 flex flex-row justify-between items-center p-4 text-3xl font-bold z-10 bg-gradient-to-b from-slate-200/70 to-slate-50/45">
            <div className="left">
                <h1 className="text-amber-400">PT MURGUNG</h1>
            </div>
            {location.pathname !== "/login" && (
                <div className="mid font-normal">
                    <ul className="flex flex-row justify-between items-center gap-4">
                        <Link to="main" className="hover:cursor-pointer">
                            Home
                        </Link>
                        <Link to="project" className="hover:cursor-pointer">
                            Project
                        </Link>
                        <Link to="about" className="hover:cursor-pointer">
                            About
                        </Link>
                        <Link to="contact" className="hover:cursor-pointer">
                            Contact
                        </Link>
                    </ul>
                </div>
            )}
            <div className="right flex flex-row justify-between items-center gap-4">
                {location.pathname !== "/login" ? (
                    !isLoggedIn ? (
                        <NavLink to="/login" className="hover:cursor-pointer">
                            Login
                        </NavLink>
                    ) : (
                        <NavLink
                            to="/login"
                            onClick={handleLogout}
                            className="hover:cursor-pointer"
                        >
                            Logout
                        </NavLink>
                    )
                ) : (
                    <NavLink
                        to="/"
                        onClick={handleLogout}
                        className="hover:cursor-pointer"
                    >
                        Home
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
