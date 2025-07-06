import { toast } from "react-toastify";
import history from "./../utils/history";

export const apiClient = async (endpoint, method = "GET", body = null) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    const url = `${BASE_URL}/${endpoint}`;

    const noAuthEndpoints = ["login", "cloudinary/images"];

    const options = {
        credentials: "include",
        method,

        headers: {
            Accept: "application/json",
        },
    };

    if (!noAuthEndpoints.includes(endpoint)) {
        const token = localStorage.getItem("token");
        if (token) {
            options.headers["Authorization"] = `Bearer ${token}`;
        }
    }

    if (body) {
        if (body instanceof FormData) {
            options.body = body;
        } else {
            // Jika body adalah objek biasa, perlakukan sebagai JSON (seperti sebelumnya).
            options.headers["Content-Type"] = "application/json";
            options.body = JSON.stringify(body);
        }
    }

    try {
        const response = await fetch(url, options);

        // Bagian error handling di bawah ini sudah bagus dan tidak perlu diubah.
        if (!response.ok) {
            const errorData = await response
                .json()
                .catch(() => ({ message: "Gagal memproses respons error." })); // fallback jika error bukan JSON
            const error = new Error(errorData.message || "API error");
            error.status = response.status;

            if (
                response.status === 401 ||
                error.message.toLowerCase().includes("unauthenticated")
            ) {
                toast.error("Sesi kamu telah berakhir. Silakan login kembali.");
                localStorage.clear();
                if (window.location.pathname !== "/login") {
                    history.push("/login");
                }
                return Promise.reject(error);
            }
            throw error;
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            // Bisa jadi respons dari upload file tidak berupa JSON, sesuaikan jika perlu.
            // Untuk saat ini, kita anggap semua respons sukses adalah JSON.
            console.error("Non-JSON response received", response);
            return response.text(); // Mengembalikan sebagai teks agar tidak error
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
