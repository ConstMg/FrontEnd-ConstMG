import React from "react";
import mrtJakarta from "./../assets/mrt-jakarta.png";
import transmart from "../assets/transmart.png";
import pegadaian from "../assets/pegadaian.png";

const OurClients = () => {
    return (
        <section className="py-16 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
                    Our Clients
                </h2>
                <div className="group flex justify-center items-center gap-12 md:gap-50 flex-wrap">
                    {/* Transmart */}
                    <div className="flex flex-col items-center transform transition-transform duration-300 group-hover:scale-150">
                        <img
                            src={transmart}
                            alt="Transmart Logo"
                            className="w-24 sm:w-32 h-auto mb-2 "
                        />
                    </div>

                    {/* MRT Jakarta */}
                    <div className="flex flex-col items-center transform transition-transform duration-300 group-hover:scale-150">
                        <img
                            src={mrtJakarta}
                            alt="MRT Jakarta Logo"
                            className="w-24 sm:w-32 h-auto mb-2"
                        />
                    </div>

                    {/* Pegadaian */}
                    <div className="flex flex-col items-center transform transition-transform duration-300 group-hover:scale-150">
                        <img
                            src={pegadaian}
                            alt="Pegadaian Logo"
                            className="w-24 sm:w-32 h-auto mb-2"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurClients;
