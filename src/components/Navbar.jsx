import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faBars,
    faXmark,
    faSignOutAlt,
    faTachometerAlt,
    faHomeAlt,
    faProjectDiagram,
    faInfoCircle,
    faEnvelope,
    faUserAlt,
    faSignInAlt,
    faUserShield,
} from "@fortawesome/free-solid-svg-icons"; // Tambahkan ikon jika perlu
import { Link as ScrollLink } from "react-scroll"; // Ganti nama agar tidak konflik
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../public/logo.svg"; // Pastikan path ini benar
import { useAuth } from "../hooks/useAuth";

// Tambahkan ikon ke library
library.add(faBars, faXmark, faSignOutAlt, faTachometerAlt, faHomeAlt);

function Navbar({
    isAdminPage,
    adminActiveComponent,
    onAdminTabChange,
    presensiIcon, // Prop untuk ikon admin
    karyawanIcon, // Prop untuk ikon admin
    proyekIcon, // Prop untuk ikon admin
}) {
    const { isLoggedIn, logout } = useAuth(); // Ambil user juga dari useAuth
    const [mainMobileMenuOpen, setMainMobileMenuOpen] = useState(false); // Ganti nama state
    const [isAdminMobileSidebarOpen, setIsAdminMobileSidebarOpen] =
        useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const hideMainSiteMidNavOn = ["/login", "/presensi", "/admin", "/project"];
    const updatedArray = hideMainSiteMidNavOn.filter(
        (path) => path !== "/presensi"
    );
    const userRole = localStorage.getItem("userRole"); // Sebaiknya gunakan dari useAuth jika ada

    const toggleMainMobileMenu = () => {
        setMainMobileMenuOpen(!mainMobileMenuOpen);
    };

    const closeAllSidebars = () => {
        setMainMobileMenuOpen(false);
        setIsAdminMobileSidebarOpen(false);
    };

    const handleLogout = () => {
        closeAllSidebars();
        logout();
        navigate("/login"); // Arahkan ke login setelah logout
    };

    const handleAdminNavClick = (tab) => {
        if (onAdminTabChange) {
            onAdminTabChange(tab);
        }
        setIsAdminMobileSidebarOpen(false);
    };

    // Efek untuk menutup sidebar jika URL berubah (berguna untuk NavLink)
    useEffect(() => {
        closeAllSidebars();
    }, [location.pathname]);

    // Navigasi Item untuk Main Mobile Menu
    const mainSiteNavItems = [
        { to: "main", label: "Home", type: "scroll", icon: faHomeAlt },
        {
            to: "project",
            label: "Project",
            type: "scroll",
            icon: faProjectDiagram,
        }, // Asumsi ini section di halaman utama
        { to: "about", label: "About", type: "scroll", icon: faInfoCircle },
        { to: "contact", label: "Contact", type: "scroll", icon: faEnvelope },
    ];
    const showMainSiteNav =
        !hideMainSiteMidNavOn.includes(location.pathname) &&
        mainSiteNavItems.length > 0;

    const renderNavByRole = () => {
        if (
            location.pathname === "/presensi" ||
            location.pathname === "/main"
        ) {
            if (userRole === "admin") {
                return [
                    { to: "/admin", label: "Admin", icon: faUserShield },
                    { to: "/main", label: "Main", icon: faHomeAlt },
                    // { to: "/logout", label: "Logout", icon: faSignOutAlt },
                ];
            } else if (userRole === "karyawan") {
                return [
                    { to: "/main", label: "Main", icon: faHomeAlt },
                    // { to: "/logout", label: "Logout", icon: faSignOutAlt },
                ];
            }
        }
        return null;
    };

    if (isLoggedIn && (userRole === "karyawan" || userRole === "admin")) {
        mainSiteNavItems.push({
            to: "/presensi",
            label: "Presensi",
            type: "navlink",
            icon: faUserAlt,
        });
    }

    return (
        <>
            {/* Main Navbar */}
            <nav className="navbar w-full fixed top-0 flex justify-between items-center px-4 sm:px-6 py-3 text-gray-800 font-bold z-[50] bg-gradient-to-b from-white/90 to-gray-50/80 backdrop-blur-md shadow-sm h-20">
                {/* Logo */}
                <div className="left-section flex-shrink-0">
                    <NavLink
                        to={
                            isLoggedIn
                                ? userRole === "admin"
                                    ? "/admin"
                                    : "/main"
                                : "/main"
                        } // Arahkan admin ke /admin, user lain ke /main
                        className="text-amber-500 hover:cursor-pointer flex items-center"
                        onClick={closeAllSidebars}
                    >
                        <img
                            src={Logo}
                            alt="Logo"
                            className="h-10 sm:h-12 w-auto"
                        />
                        {/* <span className="ml-2 text-xl sm:text-2xl text-amber-500">MURGUNG</span> */}
                    </NavLink>
                </div>

                {/* Middle Section: Desktop Navigation or Admin Title */}
                <div className="mid-section flex-grow hidden md:flex justify-center items-center">
                    {!hideMainSiteMidNavOn.includes(location.pathname) &&
                        !isAdminPage && (
                            <ul className="flex flex-row justify-center items-center gap-6 text-sm lg:text-base font-medium text-gray-600">
                                {mainSiteNavItems.map((item) =>
                                    item.type === "scroll" ? (
                                        <ScrollLink
                                            key={item.to}
                                            to={item.to}
                                            smooth={true}
                                            duration={500}
                                            offset={-80} // Sesuaikan dengan tinggi navbar
                                            className="hover:text-amber-500 hover:cursor-pointer transition-colors"
                                            onClick={closeAllSidebars} // Walaupun desktop, jaga konsistensi
                                        >
                                            {item.label}
                                        </ScrollLink>
                                    ) : (
                                        <NavLink
                                            key={item.to}
                                            to={item.to}
                                            className={({ isActive }) =>
                                                `hover:text-amber-500 transition-colors ${
                                                    isActive
                                                        ? "text-amber-500 font-semibold"
                                                        : ""
                                                }`
                                            }
                                            onClick={closeAllSidebars}
                                        >
                                            {item.label}
                                        </NavLink>
                                    )
                                )}
                            </ul>
                        )}
                    {isAdminPage && (
                        <span className="text-lg sm:text-xl text-gray-700 font-semibold">
                            Admin Dashboard
                        </span>
                    )}
                </div>

                {/* Right Section: Actions & Mobile Toggles */}
                <div className="right-section flex items-center gap-3 sm:gap-4">
                    {/* Desktop Links (Login/Logout/Dashboard) */}
                    <div className="hidden md:flex items-center gap-3 sm:gap-4 text-sm lg:text-base font-medium text-gray-600">
                        {location.pathname !== "/login" &&
                            (isLoggedIn ? (
                                <>
                                    {location.pathname === "/presensi" && (
                                        <NavLink
                                            to="/main"
                                            className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                                            onClick={closeAllSidebars}
                                        >
                                            <FontAwesomeIcon
                                                icon={faHomeAlt} // pastikan sudah import faHome dari FontAwesome
                                                className="h-4 w-4"
                                            />
                                            Home
                                        </NavLink>
                                    )}
                                    {userRole === "admin" &&
                                        location.pathname !== "/admin" && (
                                            <NavLink
                                                to="/admin"
                                                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                                                onClick={closeAllSidebars}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTachometerAlt}
                                                    className="h-4 w-4"
                                                />
                                                Dashboard
                                            </NavLink>
                                        )}
                                    {userRole === "karyawan" &&
                                        location.pathname === "/karyawan" && (
                                            <NavLink
                                                to="/karyawan"
                                                className="hover:text-amber-500 transition-colors flex items-center gap-1.5"
                                                onClick={closeAllSidebars}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faUserTie}
                                                    className="h-4 w-4"
                                                />
                                                Karyawan
                                            </NavLink>
                                        )}

                                    <button
                                        onClick={handleLogout}
                                        className="hover:text-red-500 transition-colors flex items-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSignOutAlt}
                                            className="h-4 w-4"
                                        />
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="hover:text-amber-500 transition-colors bg-amber-500 text-white px-3 py-1.5 rounded-md hover:bg-amber-600"
                                    onClick={closeAllSidebars}
                                >
                                    Login
                                </NavLink>
                            ))}
                    </div>

                    {/* Mobile Hamburger Icons */}
                    <div className="md:hidden">
                        {isAdminPage ? (
                            <button
                                onClick={() =>
                                    setIsAdminMobileSidebarOpen(
                                        !isAdminMobileSidebarOpen
                                    )
                                }
                                aria-label="Toggle Admin Navigation"
                                className="text-2xl text-gray-700 focus:outline-none hover:text-amber-500"
                            >
                                <FontAwesomeIcon
                                    icon={
                                        isAdminMobileSidebarOpen
                                            ? faXmark
                                            : faBars
                                    }
                                />
                            </button>
                        ) : (
                            !updatedArray.includes(location.pathname) && (
                                <button
                                    onClick={toggleMainMobileMenu}
                                    aria-label="Toggle main menu"
                                    className="text-2xl text-gray-700 focus:outline-none hover:text-amber-500"
                                >
                                    <FontAwesomeIcon
                                        icon={
                                            mainMobileMenuOpen
                                                ? faXmark
                                                : faBars
                                        }
                                    />
                                </button>
                            )
                        )}
                    </div>
                </div>
            </nav>

            {/* === Admin Sidebar for Mobile (dikontrol oleh isAdminMobileSidebarOpen) === */}
            {isAdminPage && (
                <>
                    {/* Overlay */}
                    {isAdminMobileSidebarOpen && (
                        <div
                            className="md:hidden fixed inset-0 bg-black/40 z-[1001]"
                            onClick={() => setIsAdminMobileSidebarOpen(false)}
                        />
                    )}
                    {/* Konten Sidebar Admin */}
                    <div
                        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[1002] md:hidden ${
                            isAdminMobileSidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }`}
                    >
                        {/* Kontainer scroll */}
                        <div className="flex flex-col h-full overflow-y-auto p-5 ">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-amber-500">
                                    Admin Menu
                                </h2>
                                <button
                                    onClick={() =>
                                        setIsAdminMobileSidebarOpen(false)
                                    }
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <FontAwesomeIcon icon={faXmark} size="lg" />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <ul className="w-full flex flex-col gap-3 text-sm flex-grow">
                                {[
                                    {
                                        label: "Presensi",
                                        tab: "presensi",
                                        icon: presensiIcon,
                                    },
                                    {
                                        label: "Karyawan",
                                        tab: "karyawan",
                                        icon: karyawanIcon,
                                    },
                                    {
                                        label: "Proyek",
                                        tab: "proyek",
                                        icon: proyekIcon,
                                    },
                                ].map((item) => (
                                    <li
                                        key={item.tab}
                                        className={`w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                                            adminActiveComponent === item.tab
                                                ? "bg-amber-100 text-amber-600 font-semibold"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-amber-500"
                                        }`}
                                        onClick={() =>
                                            handleAdminNavClick(item.tab)
                                        }
                                    >
                                        {item.icon && (
                                            <img
                                                src={item.icon}
                                                alt={item.label}
                                                className="w-5 h-5 flex-shrink-0"
                                            />
                                        )}
                                        <span>{item.label}</span>
                                    </li>
                                ))}

                                <li className="border-t mt-4 pt-4">
                                    <button
                                        onClick={() => navigate("/main")}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-gray-700 hover:bg-gray-100 hover:text-amber-500"
                                    >
                                        <FontAwesomeIcon
                                            icon={faHomeAlt}
                                            className="w-5 h-5"
                                        />
                                        Home
                                    </button>
                                    <button
                                        onClick={() => navigate("/presensi")}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-gray-700 hover:bg-gray-100 hover:text-amber-500"
                                    >
                                        <FontAwesomeIcon
                                            icon={faUserAlt}
                                            className="w-5 h-5"
                                        />
                                        Lakukan Presensi
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-red-600 hover:bg-red-50 hover:font-semibold"
                                    >
                                        <FontAwesomeIcon
                                            icon={faSignOutAlt}
                                            className="w-5 h-5"
                                        />
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}

            {/* === Main Site Mobile Menu (dikontrol oleh mainMobileMenuOpen) === */}
            {/* Tampilannya sekarang akan mirip dengan Admin Sidebar */}
            {!isAdminPage && (
                <>
                    {/* Overlay */}
                    {mainMobileMenuOpen && (
                        <div
                            className="md:hidden fixed inset-0 bg-black/40 z-[1001]"
                            onClick={toggleMainMobileMenu} // Tutup jika overlay diklik
                        />
                    )}
                    {/* Konten Sidebar Utama */}
                    <div
                        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-[1002] p-2 md:hidden ${
                            mainMobileMenuOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }`}
                    >
                        <div className="flex flex-col h-full overflow-y-auto p-2">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold text-amber-500">
                                    Menu Utama
                                </h2>
                                <button
                                    onClick={toggleMainMobileMenu}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <FontAwesomeIcon icon={faXmark} size="lg" />
                                </button>
                            </div>

                            <ul className="flex flex-col gap-3 text-sm">
                                {!updatedArray.includes(location.pathname) &&
                                    location.pathname === "/main" &&
                                    mainSiteNavItems.map((item) => (
                                        <li key={item.to}>
                                            {item.type === "scroll" ? (
                                                <ScrollLink
                                                    to={item.to}
                                                    smooth={true}
                                                    duration={500}
                                                    offset={-80}
                                                    onClick={
                                                        toggleMainMobileMenu
                                                    } // Tutup menu setelah klik
                                                    className="block w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-amber-500 cursor-pointer transition-colors"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={item.icon}
                                                        className="h-4 w-4 mr-2"
                                                    />
                                                    {item.label}
                                                </ScrollLink>
                                            ) : (
                                                <NavLink
                                                    to={item.to}
                                                    onClick={
                                                        toggleMainMobileMenu
                                                    } // Tutup menu setelah klik
                                                    className={({ isActive }) =>
                                                        `block w-full p-3 rounded-lg transition-colors ${
                                                            isActive
                                                                ? "bg-amber-100 text-amber-600 font-semibold"
                                                                : "text-gray-700 hover:bg-gray-100 hover:text-amber-500"
                                                        }`
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={item.icon}
                                                        className="h-4 w-4 mr-2"
                                                    />
                                                    {item.label}
                                                </NavLink>
                                            )}
                                        </li>
                                    ))}
                                {/* Login/Logout & Dashboard for Admin in Main Mobile Menu */}
                                <li className="border-t ">
                                    {location.pathname !== "/login" &&
                                        location.pathname === "/main" &&
                                        (isLoggedIn ? (
                                            renderNavByRole()?.map((item) => (
                                                <li key={item.to}>
                                                    <NavLink
                                                        to={item.to}
                                                        onClick={
                                                            toggleMainMobileMenu
                                                        }
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            `block w-full p-3 rounded-lg transition-colors ${
                                                                isActive
                                                                    ? "bg-amber-100 text-amber-600 font-semibold"
                                                                    : "text-gray-700 hover:bg-gray-100 hover:text-amber-500"
                                                            }`
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={item.icon}
                                                            className="h-4 w-4 mr-2"
                                                        />
                                                        {item.label}
                                                    </NavLink>
                                                </li>
                                            ))
                                        ) : (
                                            <NavLink
                                                to="/login"
                                                onClick={toggleMainMobileMenu}
                                                className="block w-full p-3 rounded-lg text-amber-500 hover:bg-amber-500 hover:text-amber-700 cursor-pointer transition-colors"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faSignInAlt}
                                                    className="h-4 w-4 mr-2"
                                                />
                                                Login
                                            </NavLink>
                                        ))}

                                    {location.pathname === "/presensi" &&
                                        renderNavByRole()?.map((item) => (
                                            <li key={item.to}>
                                                <NavLink
                                                    to={item.to}
                                                    onClick={
                                                        toggleMainMobileMenu
                                                    }
                                                    className={({ isActive }) =>
                                                        `block w-full p-3 rounded-lg transition-colors ${
                                                            isActive
                                                                ? "bg-amber-100 text-amber-600 font-semibold"
                                                                : "text-gray-700 hover:bg-gray-100 hover:text-amber-500"
                                                        }`
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        icon={item.icon}
                                                        className="h-4 w-4 mr-2"
                                                    />
                                                    {item.label}
                                                </NavLink>
                                            </li>
                                        ))}
                                    {isLoggedIn && (
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-red-600 hover:bg-red-50 hover:font-semibold"
                                        >
                                            <FontAwesomeIcon
                                                icon={faSignOutAlt}
                                                className="w-5 h-5"
                                            />
                                            Logout
                                        </button>
                                    )}
                                </li>

                                {location.pathname === "/login" &&
                                    !isLoggedIn && (
                                        <li className="border-t mt-4 pt-4">
                                            <NavLink
                                                to="/main" // Atau halaman default jika login page tidak punya menu lain
                                                onClick={toggleMainMobileMenu}
                                                className="block w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-amber-500 cursor-pointer transition-colors"
                                            >
                                                Home
                                            </NavLink>
                                        </li>
                                    )}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Navbar;
