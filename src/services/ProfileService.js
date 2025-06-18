import { apiClient } from "./ApiClient";

export const getProfile = async () => {
    return apiClient("profile", "GET");
};

export const updateProfile = async (
    headline,
    main_description,
    recent_project_desc,
    about_desc,
    nama_kantor,
    nomor_hp,
    email,
    website_url
) => {
    return apiClient("admin/profile", "PATCH", {
        headline,
        main_description,
        recent_project_desc,
        about_desc,
        nama_kantor,
        nomor_hp,
        email,
        website_url,
    });
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
