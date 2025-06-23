import React from "react";
import { FaSearch, FaUsers, FaLightbulb, FaFlag } from "react-icons/fa";
import bgFront from "../assets/bg_front.jpg";

// Data untuk kartu fitur bisa diletakkan di sini atau diimpor dari file terpisah
const features = [
    {
        icon: <FaSearch size={24} />,
        title: "Kami Berpengalaman",
        description:
            "Lebih Dari 10 Tahun. Telah menangani berbagai proyek besar seperti gedung, jembatan, dan jalan.",
    },
    {
        icon: <FaUsers size={24} />,
        title: "Tim Solid & Berpengalaman",
        description:
            "Setiap proyek ditangani oleh tenaga ahli dan profesional di bidangnya.",
    },
    {
        icon: <FaLightbulb size={24} />,
        title: "Berinovasi",
        description: "Kami menggunakan teknologi terbaru dan desain terkini.",
    },
    {
        icon: <FaFlag size={24} />,
        title: "Tantangan Bukan Halangan",
        description:
            "Kami selalu siap menghadapi dan menyelesaikan tantangan di lapangan.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="bg-white/50 text-black py-16 sm:py-20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-2">
                        MENGAPA MEMILIH KAMI
                    </h2>
                    <p className="text-black max-w-2xl mx-auto">
                        Alasan mengapa Perusahaan anda harus memilih jasa kami
                        dalam pembangunan
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch gap-8">
                    {/* Kolom Gambar */}
                    <div className="w-full lg:w-2/5">
                        <img
                            src={bgFront}
                            alt="Modern skyscraper from a low angle"
                            className="w-full h-full object-cover rounded-md shadow-lg"
                        />
                    </div>

                    {/* Kolom Fitur */}
                    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col">
                                <div className="flex items-center mb-2">
                                    <div className="text-gray-300 mr-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-lg font-bold">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-sm leading-relaxed pl-10">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
