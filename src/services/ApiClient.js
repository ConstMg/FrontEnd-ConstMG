import { toast } from "react-toastify";
import history from "./../utils/history";
// const history = createBrowserHistory();

export const apiClient = async (endpoint, method = "GET", body = null) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL_API;
    const url = `${BASE_URL}/${endpoint}`;

    // Endpoint yang tidak perlu token
    const noAuthEndpoints = ["login", "cloudinary/images"];

    const options = {
        credentials: "include",
        method,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    };

    // Jika endpoint tidak ada di noAuthEndpoints, tambahkan Authorization header
    if (!noAuthEndpoints.includes(endpoint)) {
        const token = localStorage.getItem("token"); // atau dari tempat lain
        if (token) {
            options.headers["Authorization"] = `Bearer ${token}`;
        }
    }

    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            const error = new Error(errorData.message || "API error");
            error.status = response.status;

            if (
                response.status === 401 ||
                error.message.toLowerCase().includes("unauthenticated")
            ) {
                // ✅ Langsung handle dari sini
                toast.error("Sesi kamu telah berakhir. Silakan login kembali.");
                localStorage.clear();
                if (window.location.pathname !== "/login") {
                    history.push("/login");
                }

                // Jika ingin menghentikan eksekusi
                return Promise.reject(error); // atau throw error;
            }

            throw error;
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            if (!response.ok) {
                const error = new Error(data.message || "API error");
                error.status = response.status;
                throw error;
            }
            return data;
        } else {
            console.error("Non-JSON response received", response);
            throw new Error(
                `Non-JSON response with status: ${response.status}`
            );
        }
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
};
