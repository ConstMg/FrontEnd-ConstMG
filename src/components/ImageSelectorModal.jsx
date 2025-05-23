import React, { useState, useEffect } from "react";
import { useCtx } from "../context/Context"; // Assuming useCtx provides getImagesProject and imagesData
import { X, CheckSquare, Square } from "lucide-react";

const ImageSelectorModal = ({ isOpen, onClose, onConfirmSelection }) => {
    const { imagesData, getImages, loading: imagesLoading } = useCtx(); // imagesData should hold all project images
    const [selectedImagePublicIds, setSelectedImagePublicIds] = useState(
        new Set()
    );

    useEffect(() => {
        if (isOpen) {
            // Fetch all project images if not already loaded or to refresh
            // Assuming getImages with no args fetches all project images into imagesData
            getImages("", 50);
            setSelectedImagePublicIds(new Set()); // Reset selection when modal opens
        }
    }, [isOpen, getImages]);

    const toggleImageSelection = (publicId) => {
        setSelectedImagePublicIds((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(publicId)) {
                newSelected.delete(publicId);
            } else {
                newSelected.add(publicId);
            }
            return newSelected;
        });
    };

    const handleConfirm = () => {
        onConfirmSelection(Array.from(selectedImagePublicIds));
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    const projectImages = Array.isArray(imagesData) ? imagesData : [];
    console.log("projectImages:", projectImages);

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1050] p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">
                        Pilih Gambar Proyek
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-red-200 hover:text-red-600 p-1 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-4 overflow-y-auto flex-grow">
                    {imagesLoading && (
                        <p className="text-center text-gray-600">
                            Memuat gambar proyek...
                        </p>
                    )}
                    {!imagesLoading && projectImages.length === 0 && (
                        <p className="text-center text-gray-500">
                            Tidak ada gambar proyek tersedia.
                        </p>
                    )}
                    {!imagesLoading && projectImages.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {projectImages.map((img) => (
                                <div
                                    key={img.public_id}
                                    className="relative aspect-square border rounded-md overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
                                    onClick={() =>
                                        toggleImageSelection(img.public_id)
                                    }
                                >
                                    <img
                                        src={img.secure_url}
                                        alt={`Proyek ${img.public_id}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${
                                            selectedImagePublicIds.has(
                                                img.public_id
                                            )
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-100"
                                        }`}
                                    >
                                        {selectedImagePublicIds.has(
                                            img.public_id
                                        ) ? (
                                            <CheckSquare
                                                size={32}
                                                className="text-green-400"
                                            />
                                        ) : (
                                            <Square
                                                size={32}
                                                className="text-white/70"
                                            />
                                        )}
                                    </div>
                                    {selectedImagePublicIds.has(
                                        img.public_id
                                    ) && (
                                        <div className="absolute top-1 right-1 bg-green-500 text-white p-1 rounded-full">
                                            <CheckSquare size={16} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-end items-center p-4 border-t gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={
                            selectedImagePublicIds.size === 0 || imagesLoading
                        }
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Konfirmasi Pilihan ({selectedImagePublicIds.size})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageSelectorModal;
