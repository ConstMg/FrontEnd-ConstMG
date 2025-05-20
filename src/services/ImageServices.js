import { apiClient } from "./ApiClient";

export const fetchImagesProjects = async (project_name, limit) => {
    return apiClient(
        `cloudinary/images?project_name=${project_name}&limit=${limit}`,
        "GET"
    );
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
    const query = publicIds.join(",");
    return apiClient(`admin/profile/images?public_id=${query}`, "DELETE");
};
