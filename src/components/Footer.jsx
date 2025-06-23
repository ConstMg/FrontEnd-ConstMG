import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useCtx } from "../context/Context";

const Footer = () => {
    const { profileData, loading } = useCtx();

    if (loading || !profileData) {
        return null; // atau tampilkan skeleton loader jika mau
    }

    return (
        <footer className="bg-orange-100 text-gray-800 py-10 border-t border-orange-200">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
                {/* Brand Section */}
                <div>
                    <div>
                        <h2 className="text-2xl font-bold text-orange-500 mb-2">
                            PT. MURGUNG NUSA PARAMA
                        </h2>
                        <p className="text-sm leading-relaxed">
                            Solusi konstruksi terpercaya mulai dari perencanaan,
                            pembangunan, hingga penyediaan material.
                        </p>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Kontak</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-orange-500" />
                            <span>{profileData.nomor_hp}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-orange-500" />
                            <span>{profileData.email}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-orange-500" />
                            <span>{profileData.nama_kantor}</span>
                        </li>
                    </ul>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-orange-600">
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#project"
                                className="hover:text-orange-600"
                            >
                                Project
                            </a>
                        </li>
                        <li>
                            <a href="#about" className="hover:text-orange-600">
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="hover:text-orange-600"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-xs mt-10 text-gray-500">
                &copy; {new Date().getFullYear()} {profileData.companyName}. PT. MURGUNG NUSA PARAMA.
            </div>
        </footer>
    );
};


export default Footer;
