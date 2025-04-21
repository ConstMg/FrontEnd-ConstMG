import React, { useState } from "react";
import "./../tailwind.css";

const Project = () => {
    const categories = ["Category A", "Category B", "Category C"];
    // sample image data
    // wait for the API
    const images = [
        { id: 1, category: "Category A", src: "https://indokontraktor.com/uploads/0000/1/2020/04/04/thumbnail2.png", alt: "Image A1" },
        { id: 2, category: "Category A", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhBAxEWU4n6s52hNJOW7tkLVNkBgMCRbU3AA&s", alt: "Image A2" },
        { id: 3, category: "Category B", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurx-nMXRQz_tFgev_BzMgLs0z1PIEL49W6OiggbuHcOtgzF2WR6Qh6i-GiUl__eh3qu4&usqp=CAU", alt: "Image B1" },
        { id: 4, category: "Category C", src: "https://www.autodesk.com/blogs/construction/wp-content/uploads/2024/07/140-Common-Construction-Terms-to-Know.jpg", alt: "Image C1" },
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredImages =
        selectedCategory === "All"
            ? images
            : images.filter((image) => image.category === selectedCategory);
    return (
        <>
            <div className="project h-dvh flex flex-col items-center gap-4 px-8 py-20 bg-gradient-to-tr from-[#222A35] to-transparent to-[177.41%]" id="project">
                <div className="categories flex space-x-4">
                    <button
                        className={`px-4 py-2 rounded text-xl hover:underline ${
                            selectedCategory === "All"
                                ? "text-amber-400 font-bold"
                                : "text-white"
                        }`}
                        onClick={() => setSelectedCategory("All")}
                    >
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-2 rounded text-xl hover:underline ${
                                selectedCategory === category
                                ? "text-amber-400 font-bold"
                                : "text-white"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="gallery w-full flex flex-wrap justify-center gap-8 ">
                    {filteredImages.map((image) => (
                        <div key={image.id} className="image-item w-72 h-72 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Project;
