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

export const getProjectImageUrl = async (project_name = null) => {
    const endpoint = project_name ? `cloudinary/images?project=${project_name}` : `cloudinary/images`;
    return await apiClient(endpoint, "GET");
};