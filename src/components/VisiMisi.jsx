import React from "react";
import EditableField from "./EditableField";
import { useCtx } from "../context/Context";

const VisiMisi = () => {
  const user = sessionStorage.getItem("userRole");
  const isEditable = user === "admin";
  const { profileData, updateProfileData } = useCtx();

  const handleSave = (fieldName, newValue) => {
    const updated = { ...profileData, [fieldName]: newValue };
    updateProfileData(updated);
  };

  if (!profileData) {
    // Anda bisa menampilkan loading spinner di sini
    return null;
  }

  return (
    <section className='visi-misi bg-white/50 py-16 sm:py-20' id='visi-misi'>
      <div className='container mx-auto px-4'>
        <h2 className='text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-12'>
          Visi & Misi
        </h2>
        <div className='flex flex-wrap p-4 -mx-4 '>
          {/* Kolom Visi */}
          <div className='w-full md:w-1/2 px-4 mb-8 md:mb-0'>
            <h3 className='text-2xl font-semibold text-center text-gray-700 mb-4'>
              Visi
            </h3>
            <ul className='space-y-3 text-black text-sm md:text-base font-normal leading-normal '>
              <li className='flex text-justify items-start'>
                <EditableField
                  value={profileData?.visi}
                  name='visi'
                  onSave={handleSave}
                  isEditable={isEditable}
                />
              </li>
            </ul>
          </div>

          {/* Kolom Misi */}
          <div className='w-full md:w-1/2 px-4'>
            <h3 className='text-2xl font-semibold text-center text-gray-700 mb-4'>
              Misi
            </h3>
            <ul className='space-y-3 text-black text-sm md:text-base font-normal leading-normal '>
              <li className='flex text-justify items-start'>
                <EditableField
                  value={profileData?.misi}
                  name='misi'
                  onSave={handleSave}
                  isEditable={isEditable}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
