import React, { useState } from "react";
import "./../tailwind.css";

const Project = () => {
    const categories = ["Category A", "Category B", "Category C"];
    // sample image data
    // wait for the API
    const images = [
        {
            id: 1,
            category: "Category A",
            src: "https://indokontraktor.com/uploads/0000/1/2020/04/04/thumbnail2.png",
            alt: "Image A1",
        },
        {
            id: 2,
            category: "Category A",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhBAxEWU4n6s52hNJOW7tkLVNkBgMCRbU3AA&s",
            alt: "Image A2",
        },
        {
            id: 3,
            category: "Category B",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurx-nMXRQz_tFgev_BzMgLs0z1PIEL49W6OiggbuHcOtgzF2WR6Qh6i-GiUl__eh3qu4&usqp=CAU",
            alt: "Image B1",
        },
        {
            id: 4,
            category: "Category C",
            src: "https://www.autodesk.com/blogs/construction/wp-content/uploads/2024/07/140-Common-Construction-Terms-to-Know.jpg",
            alt: "Image C1",
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredImages =
        selectedCategory === "All"
            ? images
            : images.filter((image) => image.category === selectedCategory);
    return (
      <>
        <div
          className="project h-dvh W flex flex-col items-center gap-4 px-24 py-20 bg-white"
          id="project"
        >
          <p className="text-center justify-center text-color-blue-10 text-4xl font-medium font-['Poppins'] leading-[48px]">
            Our Recent Project
          </p>
          <p className="text-center text-gray-400 font-normal font-['Poppins']">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
            deleniti aperiam eligendi voluptatem! Repellat necessitatibus qui
            quas! Obcaecati aspernatur, error odio eum aliquam dicta! Blanditiis
            atque dicta reprehenderit mollitia rem.
          </p>
          <div className="gallery w-full flex flex-wrap justify-center gap-8">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="image-item w-72 h-72 relative group overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end justify-center p-8">
                  <p className="text-white text-xl font-medium transform group-hover:-translate-y-5 transition-transform duration-300">
                    {image.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            className="cursor-pointer transition-all bg-amber-400 text-white px-6 py-2 rounded-lg
                        border-amber-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            View More
          </button>
        </div>
      </>
    );
};

export default Project;
