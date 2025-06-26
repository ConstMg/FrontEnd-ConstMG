import React from "react";
// Tidak perlu import file CSS lagi
// import './Footer.css';
import {
    FaEnvelope,
    FaPhoneAlt,
    FaFacebookF,
    FaInstagram,
} from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { useCtx } from "../context/Context";
const Header = () => {
    const { profileData } = useCtx();
    if (!profileData) {
        return null; // atau tampilkan skeleton loader jika mau
    }

    return (
        // Container utama header
        <header className="bg-black text-white py-5 px-4 mt-20 sm:px-10">
            {/* Konten yang diatur di tengah dengan lebar maksimum */}
            <div className=" max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Bagian Kiri: Info Kontak */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm">
                    {/* Item Email */}
                    <div className="flex items-center gap-3">
                        <FaEnvelope />
                        <span>{profileData?.email}</span>
                    </div>
                    {/* Item Telepon */}
                    <div className="flex items-center gap-3">
                        <FaPhoneAlt />
                        <span>{profileData?.nomor_hp}</span>
                    </div>
                </div>

                {/* Bagian Kanan: Ikon Sosial Media */}
                <div className="flex items-center gap-6">
                    <a
                        href={profileData?.facebook || "https://facebook.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="text-xl hover:text-gray-400 hover:scale-110 transition-all duration-300"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        // Gunakan template literal untuk menambahkan "mailto:"
                        href={`mailto:${profileData?.email}`}
                        aria-label="Kirim Email" // Ganti label agar lebih deskriptif
                        className="text-xl hover:text-gray-400 hover:scale-110 transition-all duration-300"
                    >
                        <FaEnvelope />
                    </a>
                    <a
                        href={profileData?.instagram || "https://instagram.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-xl hover:text-gray-400 hover:scale-110 transition-all duration-300"
                    >
                        <FaInstagram />
                    </a>
                    {/* <a
                        href="https://tiktok.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="TikTok"
                        className="text-xl hover:text-gray-400 hover:scale-110 transition-all duration-300"
                    >
                        <IoLogoTiktok />
                    </a> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
