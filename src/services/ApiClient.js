// apiClient.js
export const apiClient = async (endpoint, method = "GET", body = null) => {
  // Gunakan URL backend yang benar (tidak menggunakan localhost jika backend di Railway)
  const BASE_URL = import.meta.env.VITE_BASE_URL_API; // Ganti dengan URL backend Anda
  const url = `${BASE_URL}/${endpoint}`;

  const options = {
    credentials: "include",
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      // Tangani kesalahan respons
      const errorData = await response.json();
      const error = new Error(errorData.message || "API error");
      error.status = response.status;
      throw error;
    }
    // Tangani respons non-JSON (seperti redirect)
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
      // Jika respons bukan JSON (mungkin redirect)
      console.error("Non-JSON response received", response);
      throw new Error(`Non-JSON response with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
