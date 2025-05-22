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
