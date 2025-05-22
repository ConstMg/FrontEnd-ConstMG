import {
    getProject,
    deleteProject,
    addProject,
    updateProject,
    getProjectImageUrl,
} from "../services/ProjectService";
import { useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { addImageToProject as uploadImage } from "../services/ProjectService"; 
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

    const handleUpdateProject = async (id, nama, deskripsi) => {
        setLoading(true);
        const toastId = toast.loading("Memperbarui project...");

        try {
            await updateProject(id, nama, deskripsi);
            setProjectData((prevData) =>
                prevData.map((project) =>
                    project.id === id
                        ? { ...project, nama, deskripsi }
                        : project
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

    const handleAddProject = async (nama, deskripsi) => {
        setLoading(true);
        const toastId = toast.loading("Memperbarui project...");

        try {
            await addProject(nama, deskripsi);
            setProjectData((prevData) =>
                prevData.map((project) =>
                    project.nama_project === nama
                        ? { ...project, nama, deskripsi }
                        : project
                )
            );
            toast.update(toastId, {
                render: "Project berhasil ditambahkan",
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

    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);

    const addImageToProject = useCallback(async (project_id, imageFile) => {
        setUploading(true);
        setUploadError(null);
        setUploadSuccess(null);

        try {
            const response = await uploadImage(project_id, imageFile);
            setUploadSuccess(response.message || "Gambar berhasil diunggah");
            return response;
        } catch (err) {
            setUploadError(err.message || "Terjadi kesalahan saat upload");
            throw err;
        } finally {
            setUploading(false);
        }
    }, []);





    return {
        projectData,
        loading,
        error,
        fetchProjectData,
        uploading,
        uploadError,
        uploadSuccess,
        addImageToProject,
        handleDeleteProject,
        handleAddProject,
        handleUpdateProject,
        fetchProjectWithImages,
    };
}
