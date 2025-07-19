import { toast } from "react-toastify";
import history from "../utils/history";

const BASE_URL = import.meta.env.VITE_BASE_URL_API;

const handleUnauthorized = () => {
    toast.error("Sesi kamu telah berakhir. Silakan login kembali.");
    localStorage.clear();
    if (window.location.pathname !== "/login") {
        history.push("/login");
    }
};

export const apiClient = async (endpoint, method = "GET", body = null) => {
    const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}/${endpoint}`;
    const noAuthEndpoints = ["login", "cloudinary/images"];

    const headers = new Headers({
        Accept: "application/json",
    });

    if (!noAuthEndpoints.includes(endpoint)) {
        const token = localStorage.getItem("token");
        if (token) headers.set("Authorization", `Bearer ${token}`);
    }

    let requestBody = null;

    if (body instanceof FormData) {
        requestBody = body;
    } else if (body) {
        headers.set("Content-Type", "application/json");
        requestBody = JSON.stringify(body);
    }

    const options = {
        method,
        headers,
        credentials: "include",
        body: requestBody,
    };

    try {
        const response = await fetch(url, options);

        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            let errorData = { message: "API error" };
            try {
                errorData = await response.json();
            } catch {}

            const error = new Error(errorData.message || "Terjadi kesalahan.");
            error.status = response.status;

            if (
                response.status === 401 ||
                error.message.toLowerCase().includes("unauthenticated")
            ) {
                handleUnauthorized();
                return Promise.reject(error);
            }

            if (response.status === 403) {
                handleUnauthorized();
                return Promise.reject(error);
            }

            throw error;
        }

        if (contentType?.includes("application/json")) {
            return response.json();
        } else {
            console.warn("Non-JSON response:", response);
            return response.text();
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
