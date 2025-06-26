import { apiClient } from "./ApiClient";

export const getProfile = async () => {
    return apiClient("profile", "GET");
};

export const updateProfile = async (profileData) => {
    return apiClient("admin/profile", "PATCH", profileData);
};

export const sendEmailHome = async (name,from_email, subject, message) => {
    return apiClient("send-email-home", "POST", {
        // Menggunakan POST karena ini adalah pengiriman data
        name,
        from_email,
        subject,
        message,
    });
};
