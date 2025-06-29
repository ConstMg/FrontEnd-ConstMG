import { apiClient } from "./ApiClient";

export const fetchImagesProjects = async (project_name, limit) => {
    let endpoint = `cloudinary/images`;

    const params = new URLSearchParams();

    if (project_name) params.append("name", project_name);
    if (Number.isInteger(limit)) params.append("limit", limit);

    const queryString = params.toString();

    if (queryString) endpoint += `?${queryString}`;

    return await apiClient(endpoint, "GET");
};

export const fetcImagesAbout = async () => {
    return apiClient(`profile/images`, "GET");
};

export const postImagesAbout = async (publicIds) => {
    return apiClient("admin/profile/images", "POST", {
        public_id: publicIds,
    });
};

// DELETE: Hapus gambar about
export const deleteImagesAbout = async (publicIds) => {
    // const query = publicIds.join(",");
    return apiClient(`admin/profile/images?public_id=${publicIds}`, "DELETE");
};
