import { apiClient } from "./ApiClient";

export const fetchImages = async (project_name,limit) => {
    return apiClient(`cloudinary/images?project_name=${project_name}&limit=${limit}`, "GET");
};
