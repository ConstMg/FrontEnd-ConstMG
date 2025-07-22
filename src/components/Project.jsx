import React, { useState, useEffect } from "react";
import "./../tailwind.css";
import { useCtx } from "../context/Context";
import { NavLink } from "react-router-dom";
import EditableField from "./EditableField";
import "./../tailwind.css";
import { getRandomItems } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const Project = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const user = sessionStorage.getItem("userRole");
  const isEditable = user === "admin";
  const navigate = useNavigate();
  const {
    getImagesProject,
    imagesProjectData,
    profileData,
    updateProfileData,
  } = useCtx();
  useEffect(() => {
    getImagesProject("Project", 7);
    AOS.init({
      duration: 500,
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
      : randomImages.filter((image) => image.category === selectedCategory);
  return (
    <>
      <div
        className='project w-full flex flex-col items-center gap-4 px-6 md:px-24 py-20 '
        id='project'>
        <h2
          className='text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-12'
          data-aos='fade-up'>
          Our Recent Project
        </h2>
        <div className='w-full text-center'>
          <div
            className='text-black text-sm md:text-base font-normal leading-normal px-2 md:px-8'
            data-aos='fade-up'
            // data-aos-delay="50"
          >
            <EditableField
              // icon={<Building2 size={18} />}
              value={profileData?.recent_project_desc}
              name='recent_project_desc'
              onSave={handleSave}
              isEditable={isEditable}
            />
          </div>
        </div>

        <div
          className='gallery w-full flex flex-wrap justify-center gap-8'
          data-aos='fade-up' // AOS cukup di sini untuk seluruh galeri
        >
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className='image-item w-72 h-72 relative group overflow-hidden rounded-lg shadow-lg cursor-pointer'
              // data-aos dihapus dari sini agar tidak konflik dengan hover
              onClick={() => {
                navigate(
                  `/project/${image.category
                    .replace(/\s+/g, "_")
                    .toLowerCase()}`
                );
              }}>
              <img
                src={image.src}
                alt={image.alt}
                className='absolute inset-0 w-full h-full object-cover 
                           transition-transform duration-500 ease-in-out  // DIUBAH: durasi lebih lama dan ditambah ease-in-out
                           group-hover:scale-110'
                // data-aos dihapus dari sini
              />
              <div
                className='absolute inset-0 bg-black/0 group-hover:bg-black/50 
                           transition-all duration-500 ease-in-out' // DIUBAH: durasi lebih lama dan ditambah ease-in-out
                // data-aos dihapus dari sini
              >
                {/* Pembungkus untuk teks agar posisi awal bisa diatur */}
                <div className='absolute inset-0 flex items-end justify-center p-8'>
                  <p
                    className='text-white text-xl font-medium 
                                  opacity-0 transform translate-y-5 // DITAMBAHKAN: Posisi awal teks (tidak terlihat & sedikit di bawah)
                                  group-hover:opacity-100 group-hover:translate-y-0 // DITAMBAHKAN: Posisi akhir saat hover (terlihat & di posisi normal)
                                  transition-all duration-500 ease-in-out delay-100'>
                    {" "}
                    {/* DIUBAH: Transisi untuk semua properti dengan sedikit delay */}
                    {image.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <NavLink
          to='/project'
          data-aos='zoom-in'
          // data-aos-delay="300"
          className='cursor-pointer transition-all bg-amber-400 text-white px-6 py-2 rounded-lg
  border-amber-500 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
  active:border-b-[2px] active:brightness-90 active:translate-y-[2px]'>
          View More
        </NavLink>
      </div>
    </>
  );
};

export default Project;
