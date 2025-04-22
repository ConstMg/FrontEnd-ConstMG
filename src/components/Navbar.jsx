import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faClockRotateLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-scroll";
import { NavLink } from "react-router-dom";


// Add icons to the library
library.add(faCartShopping, faClockRotateLeft, faUser);

function Navbar() {
    return (
        <nav className="navbar w-full fixed top-0 flex flex-row justify-between items-center p-4 text-2xl z-10">
            <div className="left">
                <h1>PT MURGUNG</h1>
            </div>
            <div className="mid">
                <ul className="flex flex-row justify-between items-center gap-4">
                    <Link to="main">Home</Link>
                    <Link to='project'>Project</Link>
                    <Link to='about'>About</Link>
                    <Link to='contact'>Contact</Link>
                </ul>
            </div>
            <div className="right flex flex-row justify-between items-center gap-4">
                <FontAwesomeIcon icon="fa-cart-shopping" />
                <FontAwesomeIcon icon="fa-clock-rotate-left" />
                <FontAwesomeIcon icon="fa-user" />
                <p>Register</p>
                <NavLink to="/login">Login</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;