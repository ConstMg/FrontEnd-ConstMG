import { apiClient } from "./ApiClient";

export const getProject = async () => {
    return await apiClient(`admin/projects`, "GET");
};

export const deleteProject = async (id) => {
    return await apiClient(`admin/projects/${id}`, "DELETE");
};

export const addProject = async (formData) => {
    return await apiClient("admin/addProject", "POST", formData);
};

export const updateProject = async (formData) => {
    const { project_id, ...data } = formData;
    console.log(data);
    return await apiClient(`admin/projects/${project_id}`, "PUT", data);
};

export const getProjectImageUrl = async (project_name = null, limit = null) => {
    let endpoint = `projects`;

    const params = new URLSearchParams();

    if (project_name) params.append("name", project_name);
    if (Number.isInteger(limit)) params.append("limit", limit);

    const queryString = params.toString();

    if (queryString) endpoint += `?${queryString}`;

    return await apiClient(endpoint, "GET");
};

export const addImageToProject = async (project_id, imageFile) => {
    const formData = new FormData();
    formData.append("project_id", project_id);
    formData.append("image", imageFile);

    return await apiClient("admin/cloudinary/images", "POST", formData);
};

export const deleteImageProject = async (publicIds) => {
    return apiClient(
        `admin/cloudinary/images?public_id=${publicIds}`,
        "DELETE"
    );
};
