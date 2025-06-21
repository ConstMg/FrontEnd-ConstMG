// FlipCard.jsx
import React from "react";
// import "./FlipCard.css"; // Jika kamu letakkan CSS-nya di file terpisah

export const FlipCard = ({ imageUrl, description, title, onClick }) => {
    return (
        <div
            className="w-full h-72 [perspective:1000px] cursor-pointer group"
            onClick={onClick}
        >
            <div className="relative w-full h-full transition-transform duration-350 transform-style-preserve-3d group-hover:rotate-y-180 rounded-lg shadow-md">
                {/* Front Side */}
                <div
                    className="absolute w-full h-full rounded-lg overflow-hidden"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <p className="text-white font-bold text-xl p-4">
                            {title}
                        </p>
                    </div>
                </div>

                {/* Back Side */}
                <div
                    className="absolute w-full h-full rounded-lg bg-white text-gray-800 px-4"
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <div
                        className={`text-base font-medium overflow-y-auto h-full py-4 whitespace-pre-line ${
                            description === "-"
                                ? "text-center  flex items-center justify-center"
                                : "text-justify p-4"
                        }`}
                    >
                        {description === "-"
                            ? "Belum ada deskripsi."
                            : description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
