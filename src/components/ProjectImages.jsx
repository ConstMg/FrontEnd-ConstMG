import React, { useRef, useState } from "react";
import { useProject } from "../hooks/useProject";

const ProjectImages = ({
    images = [],
    onClose,
    projectId,
    onImageUploaded,
}) => {
    const fileInputRef = useRef(null);
    // const [localImages, setLocalImages] = useState(images); // Opsional: untuk update lokal setelah upload
    const { uploading, uploadError, uploadSuccess, addImageToProject } =
        useProject();

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const result = await addImageToProject(projectId, file);
            if (result && result?.secure_url) {
                // Jika `onImageUploaded` disediakan dari parent, panggil untuk update
                onImageUploaded?.(result.secure_url);
                // Atau update lokal saja:
                // setLocalImages((prev) => [...prev, result.data.secure_url]);
            }
        } catch (err) {
            console.error("Gagal upload gambar:", err);
        }
    };

    return (
        <div className="relative flex flex-wrap justify-center items-center gap-4 w-3/4 h-2/3 bg-white p-4 rounded-lg shadow-md overflow-auto">
            <button
                onClick={onClose}
                className="sticky top-0 z-20 w-full p-2 flex justify-end text-gray-500 hover:text-gray-700 cursor-pointer"
            >
                ✕
            </button>

            {images.length > 0 ? (
                images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Project ${index + 1}`}
                        className="w-3/4 h-1/2 md:w-1/3 lg:w-1/4 p-2 rounded-lg shadow-lg"
                    />
                ))
            ) : (
                <p className="text-gray-500 text-center w-full">
                    Tidak ada gambar untuk proyek ini.
                </p>
            )}

            {/* Tombol Tambah */}
            <div
                onClick={handleUploadClick}
                className="w-3/4 h-1/2 md:w-1/3 lg:w-1/4 p-2 rounded-lg shadow-lg flex flex-col justify-center items-center cursor-pointer border border-dashed border-gray-400 hover:bg-gray-100 transition"
            >
                <p className="text-3xl">+</p>
                <p className="text-lg">
                    {uploading ? "Mengunggah..." : "Tambah Gambar"}
                </p>
                {uploadError && (
                    <p className="text-sm text-red-500 text-center mt-2">
                        {uploadError}
                    </p>
                )}
                {uploadSuccess && (
                    <p className="text-sm text-green-500 text-center mt-2">
                        {uploadSuccess}
                    </p>
                )}
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default ProjectImages;
