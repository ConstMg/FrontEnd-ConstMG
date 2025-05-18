import { fetchImages } from "../services/ImageServices";
import { useState, useEffect } from "react";

export function useImages() {
    const [imagesData, setImagesData] = useState(null);
    const [imagesProjectData, setImagesProjectData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getImages = async (project_name = "",limit = null) => {
        setLoading(true); // start loading setiap kali fetch
        setError(null); // reset error sebelumnya
        try {
            const response = await fetchImages(project_name, limit);
            if (project_name.trim() === "") {
                console.log(`Response (all): ${response.message}`);
                setImagesData(response);
            } else {
                console.log(
                    `Response (project "${project_name}"): ${response.message}`
                );
                setImagesProjectData(response);
            }
        } catch (err) {
            setError("Gagal mengambil data gambar");
        } finally {
            setLoading(false);
        }
    };

    return {
        imagesData,
        imagesProjectData,
        loading,
        error,
        getImages,
    };
}
