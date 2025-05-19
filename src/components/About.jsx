import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import ImageGallery from "./ImageGallery";
import { Building2, Phone, Mail, Globe, Pencil, Save } from "lucide-react";
import "./../tailwind.css";
import EditableField from "./EditableField";
import { useCtx } from "../context/Context";
import { getRandomItems } from "../utils/utils";
// const images = [
//     "https://indokontraktor.com/uploads/0000/1/2020/04/04/thumbnail2.png",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhBAxEWU4n6s52hNJOW7tkLVNkBgMCRbU3AA&s",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTurx-nMXRQz_tFgev_BzMgLs0z1PIEL49W6OiggbuHcOtgzF2WR6Qh6i-GiUl__eh3qu4&usqp=CAU",
//     "https://www.autodesk.com/blogs/construction/wp-content/uploads/2024/07/140-Common-Construction-Terms-to-Know.jpg",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8pJwY-IjmLU-5MgKBJmtELnlLtlvnpX4tDw&s",
// ];
// Ambil hanya URL gambar dari imagesData
// const images =
//     imagesData?.[0]?.images?.map((img) => img.secure_url) || [];
import AOS from "aos";
import "aos/dist/aos.css";
const About = () => {
    const user = localStorage.getItem("userRole");
    const isEditable = user === "admin";
    const {
        getImagesAbout,
        imagesAboutData,
        profileData,
        updateProfileData,
        addImagesAbout,
        removeImagesAbout,
    } = useCtx();
    const [activeIndex, setActiveIndex] = useState(null);
    useEffect(() => {
        getImagesAbout();
        AOS.init({
            duration: 1000, // durasi animasi dalam ms
            once: true, // animasi hanya jalan sekali
        });
    }, []);
    // const images = imagesData?.[0]?.images?.map((img) => img.secure_url) || [];
    const handleSave = (fieldName, newValue) => {
        const updated = { ...profileData, [fieldName]: newValue };
        updateProfileData(updated);
    };
    if (!profileData) return null;
    const images = Array.isArray(imagesAboutData) ? imagesAboutData : [];

    // console.log("images pesan: ", imagesData?.data?.project_name);
    console.log("images: ", images);
    return (
        <>
            <div
                className="about min-h-screen bg-white-100 flex justify-center items-center"
                id="about"
            >
                <div className="w-full px-2 py-10 md:py-10 inline-flex flex-col justify-center items-center gap-0 md:gap-12 pb-20">
                    {/* Header Section - Made responsive */}
                    <div className="w-full max-w-[900px] px-4 md:px-6 relative">
                        <div className="w-full text-center mb-4">
                            <div
                                className="text-color-blue-10 text-2xl md:text-4xl font-medium font-['Poppins'] leading-tight md:leading-[48px]"
                                data-aos="fade-up"
                            >
                                ABOUT US
                            </div>
                        </div>
                        <div className="w-full text-center">
                            <div
                                className="text-gray-400 text-sm md:text-base font-normal font-['Poppins'] leading-normal px-2 md:px-8"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <EditableField
                                    value={profileData?.about_desc}
                                    name="about_desc"
                                    onSave={handleSave}
                                    isEditable={isEditable}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="flex flex-col items-center justify-center gap-3 md:gap-6 w-full">
                        {/* Display gallery when an image is selected */}
                        {activeIndex !== null && (
                            <ImageGallery
                                images={images.map((img) => img.secure_url)}
                                initialIndex={activeIndex}
                                onClose={() => setActiveIndex(null)}
                            />
                        )}

                        {/* Thumbnail list - Made responsive with smaller gaps on mobile */}
                        <div className="w-full max-w-5.5 md:max-w-[1320px] flex flex-wrap items-center justify-center gap-3 md:gap-6 px-2 md:px-4">
                            {images.length === 0 ? (
                                <div className="text-gray-500 text-sm">
                                    Loading gambar...
                                </div>
                            ) : (
                                <div className="w-full max-w-5.5 md:max-w-[1320px] flex flex-wrap items-center justify-center gap-3 md:gap-6 px-2 md:px-4">
                                    {images.map((img, i) => (
                                        <div
                                            key={i}
                                            onClick={() => setActiveIndex(i)}
                                            className="md:w-auto"
                                            data-aos="zoom-in"
                                            data-aos-delay={i * 100}
                                        >
                                            <ImageCard
                                                imagePath={img?.secure_url}
                                                variant={i + 1}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
