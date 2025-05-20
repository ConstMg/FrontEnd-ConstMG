import React, { useState, useEffect } from "react";
import "./../tailwind.css";
import { useCtx } from "../context/Context";
import { NavLink } from "react-router-dom";
import EditableField from "./EditableField";
import "./../tailwind.css";
import { getRandomItems } from "../utils/utils";
import AOS from "aos";
import "aos/dist/aos.css";
const Project = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const user = localStorage.getItem("userRole");
    const isEditable = user === "admin";
    const {
        getImagesProject,
        imagesProjectData,
        profileData,
        updateProfileData,
    } = useCtx();
    useEffect(() => {
        getImagesProject("Project", 7);
        AOS.init({
            duration: 800,
            once: true, // animasi hanya sekali
        });
    }, []);
    const handleSave = (fieldName, newValue) => {
        const updated = { ...profileData, [fieldName]: newValue };
        updateProfileData(updated);
    };
    if (!profileData) return null;
    const imagesRaw =
        imagesProjectData?.data?.flatMap((project) =>
            project.images?.map((img) => ({
                project_name: project.project_name,
                secure_url: img.secure_url,
            }))
        ) || [];

    // sample image data
    // wait for the API
    const images = imagesRaw.map((img, index) => ({
        id: index + 1,
        category: img.project_name,
        src: img.secure_url,
        alt: img.project_name,
    }));

    // Ambil 5 gambar random
    const randomImages = getRandomItems(images, 8);
    const filteredImages =
        selectedCategory === "All"
            ? randomImages
            : randomImages.filter(
                  (image) => image.category === selectedCategory
              );
    return (
        <>
            <div
                className="project w-full flex flex-col items-center gap-4 px-6 md:px-24 py-20 bg-white/50"
                id="project"
            >
                <p
                    className="text-center justify-center text-color-blue-10 text-4xl font-medium font-['Poppins'] leading-[48px]"
                    data-aos="fade-up"
                >
                    Our Recent Project
                </p>
                <div className="w-full text-center">
                    <div
                        className="text-gray-400 text-sm md:text-base font-normal font-['Poppins'] leading-normal px-2 md:px-8"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <EditableField
                            // icon={<Building2 size={18} />}
                            value={profileData?.recent_project_desc}
                            name="recent_project_desc"
                            onSave={handleSave}
                            isEditable={isEditable}
                        />
                    </div>
                </div>

                <div
                    className="gallery w-full flex flex-wrap justify-center gap-8"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="image-item w-72 h-72 relative group overflow-hidden rounded-lg shadow-lg"
                            data-aos="fade-up"
                            data-aos-delay="200"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                data-aos="fade-down"
                                data-aos-delay="300"
                            />
                            <div
                                className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end justify-center p-8"
                                data-aos="zoom-in"
                                data-aos-delay="350"
                            >
                                <p className="text-white text-xl font-medium transform group-hover:-translate-y-5 transition-transform duration-300">
                                    {image.category}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <NavLink
                    to="/project"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                    className="cursor-pointer transition-all bg-amber-400 text-white px-6 py-2 rounded-lg
  border-amber-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                >
                    View More
                </NavLink>
            </div>
        </>
    );
};

export default Project;
