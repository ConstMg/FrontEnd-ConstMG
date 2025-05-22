import { apiClient } from "./ApiClient";

export const getProject = async () => {
    return await apiClient(`admin/projects`, "GET");
};

export const deleteProject = async (id) => {
    return await apiClient(`admin/projects/${id}`, "DELETE");
};

export const addProject = async (nama_project, deskripsi) => {
    return await apiClient(`admin/addProject`, "POST", {
        nama_project,
        deskripsi,
    });
};

export const updateProject = async (project_id, name, deskripsi) => {
    return await apiClient(`admin/projects/${project_id}`, "PUT", {
        name,
        deskripsi,
    });
};

export const getProjectImageUrl = async (project_name = null, limit = null) => {
    let endpoint = `projects`;

    const params = new URLSearchParams();

    if (project_name) params.append("name", project_name);
    if (Number.isInteger(limit)) params.append("limit", limit);

    const queryString = params.toString();

    if (queryString) endpoint += `?${queryString}`;
    console.log(endpoint);

    return await apiClient(endpoint, "GET");
};

export const addImageToProject = async (project_id, imageFile) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    const endpoint = "admin/cloudinary/images";
    const url = `${BASE_URL}/${endpoint}`;

    const token = localStorage.getItem("token"); // atau dari tempat lain jika kamu simpan di context/state

    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("image", imageFile); // pastikan ini adalah objek File

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                // Jangan set Content-Type manual agar browser handle boundary
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            const error = new Error(data.message || "Gagal mengunggah gambar");
            error.status = response.status;
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Error saat addImageToProject:", error);
        throw error;
    }
};
