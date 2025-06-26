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
            className="bg-gradient-to-r from-orange-50 to-yellow-100 py-16"
            id="services"
        >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
                    Service
                </h2>
                <div className="grid md:grid-cols-2 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="p-6 bg-orange-50">
                                <h3 className="text-2xl font-semibold text-orange-600 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-700 leading-relaxed">
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
