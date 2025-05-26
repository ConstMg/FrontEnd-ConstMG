import React, { useRef, useState, useEffect } from "react";
import { useProject } from "../hooks/useProject";
import ConfirmationCard from "./ConfirmationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ProjectImages = ({
    images = [],
    onClose,
    projectId,
    onImageUploaded,
    onImageUploadedCallback,
}) => {
    const fileInputRef = useRef(null);
    const {
        uploading,
        uploadError,
        uploadSuccess,
        addImageToProject,
        deleteImageFromProject,
    } = useProject();
    const [localImages, setLocalImages] = useState(images);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState(null);
    library.add(faTrashCan);

    useEffect(() => {
        setLocalImages(images); // Sinkronkan jika props berubah
    }, [images]);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteClick = (public_id) => {
        setSelectedImageId(public_id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteImageFromProject([selectedImageId]);
            onImageUploaded?.();

            const updatedImages = localImages.filter(
                (img) => img.public_id !== selectedImageId
            );
            setLocalImages(updatedImages);
            onImageUploadedCallback?.(updatedImages);
        } catch (err) {
            console.error("Gagal menghapus gambar:", err);
        } finally {
            setShowConfirm(false);
            setSelectedImageId(null);

            // ✅ Tutup modal setelah hapus berhasil
            onClose?.();
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
        setSelectedImageId(null);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const result = await addImageToProject(projectId, file);
            if (result && result?.secure_url) {
                const newImage = {
                    secure_url: result.secure_url,
                    public_id: result.public_id,
                };

                const updatedImages = [...localImages, newImage];
                setLocalImages(updatedImages);

                // update tampilan lokal
                onImageUploadedCallback?.(updatedImages);

                // opsional: fetch data baru dari API
                onImageUploaded?.();
                // ✅ Tutup modal setelah upload berhasil
                onClose?.();
            }
        } catch (err) {
            console.error("Gagal upload gambar:", err);
        }
    };

    return (
        <div className="relative w-3/4 h-2/3">
            <button
                onClick={onClose}
                className="absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition-all duration-200"
            >
                <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
            </button>
            <div className="h-full flex flex-wrap justify-center items-center gap-4 bg-white p-4 rounded-lg shadow-md overflow-auto">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div
                            key={index}
                            className="relative w-3/4 h-1/2 md:w-1/3 lg:w-1/4 p-2"
                        >
                            <img
                                src={image.secure_url}
                                alt={`Project ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg shadow-lg"
                            />

                            <button
                                onClick={() =>
                                    handleDeleteClick(image.public_id)
                                }
                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow-md"
                                title="Hapus Gambar"
                            >
                                <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                        </div>
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

                {showConfirm && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
                        <ConfirmationCard
                            variant="delete"
                            itemname="gambar ini"
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectImages;
