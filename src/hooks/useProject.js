import {
    getProject,
    deleteProject,
    addProject,
    updateProject,
    getProjectImageUrl,
    deleteImageProject,
} from "../services/ProjectService";
import { useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { addImageToProject as uploadImage } from "../services/ProjectService";
import { compressImage } from "../utils/utils";

export function useProject() {
    const [projectData, setProjectData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProjectData = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getProject();
            setProjectData(response.data);
            return response.data;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render:
                    error.message ||
                    "Terjadi kesalahan saat memuat data project.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDeleteProject = async (id) => {
        setLoading(true);
        const toastId = toast.loading("Menghapus project...");

        try {
            await deleteProject(id);
            setProjectData((prevData) =>
                prevData.filter((project) => project.id !== id)
            );
            toast.update(toastId, {
                render: "Project berhasil dihapus!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            return true;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render:
                    error.message ||
                    "Terjadi kesalahan saat menghapus project.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProject = async (project) => {
        setLoading(true);
        const toastId = toast.loading("Memperbarui project...");
        console.log(`use Project : ${project}`);
        try {
            const response = await updateProject(project);

            setProjectData((prevData) =>
                prevData.map((p) =>
                    p.id === project.project_id ? response.data : p
                )
            );

            toast.update(toastId, {
                render: "Project berhasil diperbarui!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            return true;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render:
                    error.message ||
                    "Terjadi kesalahan saat memperbarui project.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleAddProject = async (project) => {
        const {
            nama_project,
            deskripsi,
            pemberi_kerja,
            tanggal_dimulai_proyek,
            tanggal_selesai_proyek,
            kategori,
            nilai_kontrak,
        } = project;

        // 💡 Validasi: tanggal selesai tidak boleh lebih awal dari tanggal mulai
        if (
            tanggal_dimulai_proyek &&
            tanggal_selesai_proyek &&
            !isNaN(new Date(tanggal_selesai_proyek)) &&
            new Date(tanggal_selesai_proyek) < new Date(tanggal_dimulai_proyek)
        ) {
            toast.error(
                "Tanggal selesai tidak boleh lebih awal dari tanggal mulai."
            );
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Menambahkan project...");

        try {
            const response = await addProject(project);

            setProjectData((prevData) => [...prevData, response.data]);

            toast.update(toastId, {
                render: "✅ Project berhasil ditambahkan",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            return true;
        } catch (error) {
            console.error("AddProject error:", error.response?.data || error);
            setError(error);

            toast.update(toastId, {
                render:
                    error.response?.data?.message ||
                    error.message ||
                    "Terjadi kesalahan saat menambahkan project.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchProjectWithImages = useCallback(async (limit) => {
        setLoading(true);

        try {
            const response = await getProjectImageUrl("", limit);
            console.log("Project with images:", response.data);
            return response.data;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchProjectWithImagesByName = useCallback(async (name, limit) => {
        setLoading(true);

        try {
            const response = await getProjectImageUrl(name, limit);
            console.log("Project with images:", response.data);
            return response.data;
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);

    const addImageToProject = useCallback(async (project_id, imageFile) => {
        setUploading(true);
        const toastId = toast.loading("Mengunggah gambar...");
        setUploadError(null);
        setUploadSuccess(null);

        try {
            const compressedFile = await compressImage(imageFile, 0.5);

            // Panggil fungsi upload dengan file yang sudah dikompres
            const response = await uploadImage(project_id, compressedFile);

            setUploadSuccess(response.message || "Gambar berhasil diunggah");
            toast.update(toastId, {
                render: "Gambar berhasil diunggah!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });
            return response;
        } catch (error) {
            setUploadError(error.message || "Terjadi kesalahan saat upload");

            toast.update(toastId, {
                render:
                    error.message ||
                    "Terjadi kesalahan saat mengunggah gambar.",
                type: "error",
                isLoading: false,
                autoClose: 2000,
            });

            throw error;
        } finally {
            setUploading(false);
        }
    }, []);

    const deleteImageFromProject = async (publicIds) => {
        setLoading(true);
        const toastId = toast.loading("Menghapus gambar...");

        try {
            await deleteImageProject(publicIds); // panggil dari services
            toast.update(toastId, {
                render: "Gambar berhasil dihapus!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });
            return true;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render:
                    error.message || "Terjadi kesalahan saat menghapus gambar.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        projectData,
        loading,
        error,
        fetchProjectData,
        uploading,
        uploadError,
        uploadSuccess,
        deleteImageFromProject,

        addImageToProject,
        handleDeleteProject,
        handleAddProject,
        handleUpdateProject,
        fetchProjectWithImages,
        fetchProjectWithImagesByName,
    };
}
