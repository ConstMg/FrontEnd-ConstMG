import React from "react";
import supplierImage from "../assets/supplier.webp";
import arsitekturImage from "../assets/arsitektur.jpg";
import generalImage from "../assets/general-contactor.jpg";
import aluminiumImage from "../assets/almunium.webp";

const services = [
    {
        title: "General Contractor",
        description:
            "Mengerjakan serta melakukan pengawasan dalam proyek konstruksi untuk menghasilkan bangunan yang kokoh dan sesuai standar.",
        image: generalImage,
    },
    {
        title: "Civil",
        description:
            "Pekerjaan konstruksi sipil yang mencakup pembangunan jalan, jembatan, drainase, struktur beton, dan infrastruktur lainnya dengan standar kualitas tinggi.",
        image: arsitekturImage,
    },
    {
        title: "Aluminium Applicator",
        description:
            "Menghadirkan layanan pemasangan dan finishing aluminium berkualitas untuk berbagai kebutuhan bangunan.",
        image: aluminiumImage,
    },
    {
        title: "Supplier",
        description:
            "Menyediakan berbagai material dan perlengkapan konstruksi berkualitas tinggi untuk mendukung kelancaran proyek pembangunan.",
        image: supplierImage,
    },
];

const Services = () => {
    return (
        <section
            id="services"
            className="min-h-screen w-full bg-gradient-to-r from-[#ffffff] to-[#999999] py-16 px-4"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
                    Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-t-3xl border border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="p-6 bg-[#fffaf0]">
                                <h3 className="text-2xl font-semibold text-orange-600 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
