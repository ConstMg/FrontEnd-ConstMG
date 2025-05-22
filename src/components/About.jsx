import React, { useRef,useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import ImageGallery from "./ImageGallery";
import { Building2, Phone, Mail, Globe, Pencil, Save, PlusCircle, Trash2 } from "lucide-react";
import "./../tailwind.css";
import ImageSelectorModal from ".//ImageSelectorModal"; // Import modal baru
import EditableField from "./EditableField";
import { useCtx } from "../context/Context";

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
    const [showImageSelectorModal, setShowImageSelectorModal] = useState(false);
    useEffect(() => {
        getImagesAbout();
        AOS.init({
            duration: 500, // durasi animasi dalam ms
            once: true, // animasi hanya jalan sekali
        });
    }, []);

    const handleSave = (fieldName, newValue) => {
        const updated = { ...profileData, [fieldName]: newValue };
        updateProfileData(updated);
    };

    const handleAddImageClick = () => {
        setShowImageSelectorModal(true); // Buka modal pemilihan gambar
    };

    const handleImageSelectionConfirm = async (selectedPublicIds) => {
        if (selectedPublicIds && selectedPublicIds.length > 0) {
            await addImagesAbout(selectedPublicIds); // addImagesAbout sudah mengharapkan array publicIds
            // getImagesAbout(); // addImagesAbout di useCtx sudah memanggil getImagesAbout
        }
        setShowImageSelectorModal(false);
    };
    const handleRemoveImage = async (publicId) => {
        // Konfirmasi sebelum menghapus
        if (window.confirm("Apakah Anda yakin ingin menghapus gambar ini?")) {
            await removeImagesAbout(publicId); // Asumsi removeImagesAbout menerima imageId dan public_id
            getImagesAbout(); // Refresh gambar setelah menghapus
        }
    };

    if (!profileData) return null;
    const images = Array.isArray(imagesAboutData) ? imagesAboutData : [];
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
                                // data-aos-delay="200"
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

                    {/* Tombol Tambah Gambar untuk Admin */}
                    {isEditable && (
                        <div className="w-full md:max-w-[1320px] flex justify-center sm:justify-end px-2 sm:px-4 mb-4">
                            <button
                                onClick={handleAddImageClick}
                                className="bg-color-blue-10 hover:bg-blue-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg flex items-center gap-2 transition-colors duration-150 text-sm sm:text-base"
                            >
                                <PlusCircle size={20} />
                                Tambah Gambar
                            </button>
                        </div>
                    )}
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
                                            key={img.public_id || i} // Gunakan ID unik jika ada, fallback ke index
                                            className="relative group md:w-auto"
                                            data-aos="zoom-in"
                                            // data-aos-delay={i * 100}
                                        >
                                            <div
                                                onClick={() =>
                                                    setActiveIndex(i)
                                                }
                                                className="cursor-pointer"
                                            >
                                                <ImageCard
                                                    imagePath={img?.secure_url}
                                                    variant={i + 1}
                                                />
                                            </div>
                                            {isEditable && (
                                                <button
                                                    onClick={() =>
                                                        handleRemoveImage(
                                                            img.public_id
                                                        )
                                                    } // Asumsi img memiliki 'id' dan 'public_id'
                                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                                                    title="Hapus Gambar"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal Pemilihan Gambar */}
            <ImageSelectorModal
                isOpen={showImageSelectorModal}
                onClose={() => setShowImageSelectorModal(false)}
                onConfirmSelection={handleImageSelectionConfirm}
            />
        </>
    );
};

export default About;
