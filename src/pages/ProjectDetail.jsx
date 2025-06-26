import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProject } from "../hooks/useProject";
import Navbar from "../components/Navbar";

const ProjectDetail = () => {
    const { projectName } = useParams();
    const { fetchProjectWithImagesByName } = useProject();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showFullImage, setShowFullImage] = useState(false);

    useEffect(() => {
        const loadProjectData = async () => {
            setLoading(true);
            try {
                // Convert URL-friendly project name back to original format
                const formattedName = projectName.replace(/_/g, " ");
                const data = await fetchProjectWithImagesByName(formattedName);
                setProject(data[0]);
            } catch (error) {
                console.error("Error loading project data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadProjectData();
    }, [projectName, fetchProjectWithImagesByName]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(value);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-100">
                <div className="text-xl text-yellow-500">
                    Loading project details...
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-100">
                <div className="text-xl text-red-500">
                    Proyek tidak ditemukan
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            {/* Full screen image modal */}
            {showFullImage && project.images.length > 0 && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                    onClick={() => setShowFullImage(false)}
                >
                    <button
                        className="absolute top-4 right-4 text-white text-2xl"
                        onClick={() => setShowFullImage(false)}
                    >
                        &times;
                    </button>
                    <img
                        src={project.images[currentImageIndex].secure_url}
                        alt={`Full view ${currentImageIndex + 1}`}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                    />
                </div>
            )}

            <div className="container mx-auto px-4 pt-24 pb-12">
                {/* Back link */}
                <div className="mb-6">
                    <Link
                        to="/project"
                        className="flex items-center text-yellow-500 hover:text-yellow-600"
                    >
                        Back to Projects
                    </Link>
                </div>

                {/* Project title */}
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                    {project.project_name}
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left column - Images */}
                    <div>
                        <div className="bg-white p-4 rounded-xl shadow-md">
                            {project.images && project.images.length > 0 ? (
                                <div className="relative">
                                    <div className="h-[400px] w-full mb-4">
                                        <img
                                            src={
                                                project.images[
                                                    currentImageIndex
                                                ].secure_url
                                            }
                                            alt={`Project Image ${
                                                currentImageIndex + 1
                                            }`}
                                            className="rounded-lg w-full h-full object-contain cursor-pointer"
                                            onClick={() =>
                                                setShowFullImage(true)
                                            }
                                        />
                                    </div>

                                    {/* Image navigation arrows */}
                                    {project.images.length > 1 && (
                                        <>
                                            <button
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    prevImage();
                                                }}
                                            >
                                                &lt;
                                            </button>
                                            <button
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    nextImage();
                                                }}
                                            >
                                                &gt;
                                            </button>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="h-[400px] w-full bg-gray-200 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-500">
                                        No Images Available
                                    </p>
                                </div>
                            )}

                            {/* Thumbnails */}
                            {project.images && project.images.length > 1 && (
                                <div className="flex space-x-2 mt-4 overflow-x-auto py-2">
                                    {project.images.map((image, index) => (
                                        <div
                                            key={image.public_id}
                                            className={`w-20 h-20 flex-shrink-0 cursor-pointer ${
                                                currentImageIndex === index
                                                    ? "ring-2 ring-yellow-500"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setCurrentImageIndex(index)
                                            }
                                        >
                                            <img
                                                src={image.secure_url}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover rounded-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right column - Project details */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Detail Proyek
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Deskripsi
                                </p>
                                <p className="font-medium">
                                    {project.deskripsi}
                                </p>
                            </div>

                            <div className="flex items-start">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Pemberi Kerja
                                    </p>
                                    <p className="font-medium">
                                        {project.pemberi_kerja}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Waktu pengerjaan Proyek
                                    </p>
                                    <p className="font-medium">
                                        {project.tanggal_dimulai_proyek == "-"
                                            ? "-"
                                            : `${formatDate(
                                                  project.tanggal_dimulai_proyek
                                              )} - ${formatDate(
                                                  project.tanggal_selesai_proyek
                                              )}`}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        kategori
                                    </p>
                                    <p className="font-medium capitalize">
                                        {project.kategori}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Nilai Kontrak
                                    </p>
                                    <p className="font-medium">
                                        {project.nilai_kontrak == "-"
                                            ? "-"
                                            : formatCurrency(
                                                  project.nilai_kontrak
                                              )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Project duration calculation */}
                        {project.tanggal_dimulai_proyek &&
                            project.tanggal_selesai_proyek && (
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-500">
                                        Durasi Pengerjaan Proyek
                                    </p>
                                    <p className="font-medium">
                                        {project.tanggal_dimulai_proyek == "-"
                                            ? "-"
                                            : `${Math.ceil(
                                                  (new Date(
                                                      project.tanggal_selesai_proyek
                                                  ) -
                                                      new Date(
                                                          project.tanggal_dimulai_proyek
                                                      )) /
                                                      (1000 * 60 * 60 * 24)
                                              )} Hari`}
                                    </p>
                                </div>
                            )}

                        <div className="mt-5 flex items-start">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Status
                                </p>
                                <p className="font-medium capitalize">
                                    {project.status}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetail;
