import { apiClient } from "./ApiClient";

export const getProject = async () => {
    return await apiClient("admin/projects", "GET");
};

export const deleteProject = async (id) => {
    return await apiClient(`admin/projects/${id}`, "DELETE");
}