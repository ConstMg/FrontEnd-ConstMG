// FlipCard.jsx
import React from "react";

export const FlipCard = ({ imageUrl, description, title, onClick }) => {
    return (
        <div className="group [perspective:1000px]" onClick={onClick}>
            <div
                className="w-full h-72 cursor-pointer transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                // [PERBAIKAN] Menambahkan ini akan menjaga konteks 3D dari parent ke child
                style={{ transformStyle: "preserve-3d" }}
            >
                <div
                    className="relative w-full h-full transition-transform duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:rotate-y-180 shadow-lg group-hover:shadow-xl group-hover:shadow-black/20 will-change-transform"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Front Side */}
                    <div
                        className="absolute w-full h-full rounded-lg overflow-hidden"
                        style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                        }}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="h-full w-full bg-gray-200 rounded-lg flex items-center justify-center">
                                <p className="text-gray-500">
                                    Image Not Available
                                </p>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                            <p className="text-white font-bold text-xl p-4">
                                {title}
                            </p>
                        </div>
                    </div>

                    {/* Back Side */}
                    <div
                        className="absolute w-full h-full rounded-lg bg-white text-gray-800 p-4 rotate-y-180"
                        style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                        }}
                    >
                        <div className="text-base font-medium h-full flex items-center justify-center text-center overflow-auto">
                            {description && description.trim() !== "-"
                                ? description
                                : "Belum ada deskripsi."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
