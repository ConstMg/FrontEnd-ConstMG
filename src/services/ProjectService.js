import { apiClient } from "./ApiClient";

export const getProject = async (role) => {
    return await apiClient(`admin/projects?akses=${role}`, "GET");
};

export const deleteProject = async (id,role) => {
    return await apiClient(`admin/projects/${id}?akses=${role}`, "DELETE");
}

export const addProject = async (
    nama_project,
    deskripsi,
    userRole
) => {
    return await apiClient(`admin/addProject?akses=${userRole}`, "POST", {
        nama_project,
        deskripsi,
    });
};

export const updateProject = async (
    project_id,
    name,
    deskripsi,
    userRole
) => {
    return await apiClient(`admin/projects/${project_id}?akses=${userRole}`, "PUT", {
        name,
        deskripsi
    });
}