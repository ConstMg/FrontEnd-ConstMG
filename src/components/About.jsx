import React, { useRef, useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import ConfirmationCard from "./ConfirmationCard"; // sesuaikan path-nya
import ImageGallery from "./ImageGallery";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  Pencil,
  Save,
  PlusCircle,
  Trash2,
} from "lucide-react";
import "./../tailwind.css";
import ImageSelectorModal from ".//ImageSelectorModal"; // Import modal baru
import EditableField from "./EditableField";
import { useCtx } from "../context/Context";

import AOS from "aos";
import "aos/dist/aos.css";
const About = () => {
  const user = sessionStorage.getItem("userRole");

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
  const [showConfirmation, setShowConfirm] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
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
    }
    setShowImageSelectorModal(false);
  };
  const handleRemoveImage = (publicId) => {
    setSelectedImageId(publicId);
    setShowConfirm(true);
  };

  const confirmRemove = async () => {
    if (selectedImageId) {
      await removeImagesAbout(selectedImageId);
      getImagesAbout();
    }
    setShowConfirm(false);
    setSelectedImageId(null);
  };

  if (!profileData) return null;
  const images = Array.isArray(imagesAboutData) ? imagesAboutData : [];
  return (
    <>
      <div
        className='about bg-white/50 w-full bg-white-100 flex justify-center items-center'
        id='about'>
        <div className='w-full px-2 py-10 md:py-10 inline-flex flex-col justify-center items-center gap-0 md:gap-12 pb-20'>
          {/* Header Section - Made responsive */}
          <div className='w-full max-w-[1350px] px-4 md:px-6 relative'>
            <div className='w-full text-center mb-4'>
              <h2
                className='ttext-2xl sm:text-4xl font-bold text-center text-gray-800 mb-12'
                data-aos='fade-up'>
                ABOUT US
              </h2>
            </div>
            <div className='w-full text-center'>
              <div
                className='text-black text-sm md:text-base font-normal leading-normal px-2 md:px-8'
                data-aos='fade-up'
                // data-aos-delay="200"
              >
                <EditableField
                  value={profileData?.about_desc}
                  name='about_desc'
                  onSave={handleSave}
                  isEditable={isEditable}
                />
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className='flex flex-col items-center justify-center gap-3 md:gap-6 w-full'>
            {/* Display gallery when an image is selected */}
            {activeIndex !== null && (
              <ImageGallery
                images={images.map((img) => img.secure_url)}
                initialIndex={activeIndex}
                onClose={() => setActiveIndex(null)}
              />
            )}

            {/* Thumbnail list - Made responsive with smaller gaps on mobile */}
            <div className='w-full max-w-5.5 md:max-w-[1320px] flex flex-wrap items-center justify-center gap-3 md:gap-6 px-2 md:px-4'>
              {images.length === 0 ? (
                <div className='text-gray-500 text-sm'>
                  Gambar belum tersedia.
                </div>
              ) : (
                <div className='w-full max-w-5.5 md:max-w-[1320px] flex flex-wrap items-center justify-center gap-3 md:gap-6 px-2 md:px-4'>
                  {images.map((img, i) => (
                    <div
                      key={img.public_id || i} // Gunakan ID unik jika ada, fallback ke index
                      className='relative group md:w-auto'
                      data-aos='zoom-in'>
                      <div
                        onClick={() => setActiveIndex(i)}
                        className='cursor-pointer'>
                        <ImageCard
                          imagePath={img?.secure_url}
                          variant={i + 1}
                        />
                      </div>
                      {isEditable && (
                        <button
                          onClick={() => handleRemoveImage(img.public_id)}
                          className='absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-1.5 rounded-full z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200'
                          title='Hapus Gambar'>
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {isEditable && (
                <div className='w-full md:max-w-[1320px] flex justify-center px-2 sm:px-4 mt-10'>
                  <button
                    onClick={handleAddImageClick}
                    className='bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg flex items-center gap-2 transition-colors duration-150 text-sm sm:text-base'>
                    <PlusCircle size={20} />
                    Tambah Gambar
                  </button>
                </div>
              )}

              {showConfirmation && (
                <div className='fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center'>
                  <ConfirmationCard
                    variant='delete'
                    itemname='gambar'
                    onConfirm={confirmRemove}
                    onCancel={() => setShowConfirm(false)}
                  />
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
      {/* Tombol Tambah Gambar untuk Admin */}
    </>
  );
};

export default About;
