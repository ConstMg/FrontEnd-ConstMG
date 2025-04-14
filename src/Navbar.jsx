import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping, faClockRotateLeft, faUser } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faCartShopping, faClockRotateLeft, faUser);

function Navbar() {
    return (
        <nav className="navbar w-full fixed top-0 flex flex-row justify-between items-center p-4 text-2xl">
            <div className="left">
                <h1>PT MURGUNG</h1>
            </div>
            <div className="mid">
                <ul className="flex flex-row justify-between items-center gap-4">
                    <li>Home</li>
                    <li>Product</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div className="right flex flex-row justify-between items-center gap-4">
                <FontAwesomeIcon icon="fa-cart-shopping" />
                <FontAwesomeIcon icon="fa-clock-rotate-left" />
                <FontAwesomeIcon icon="fa-user" />
                <p>Register</p>
                <p>Login</p>
            </div>
        </nav>
    );
}

export default Navbar;