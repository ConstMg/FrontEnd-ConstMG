import {
    fetchImagesProjects,
    fetcImagesAbout,
    postImagesAbout,
    deleteImagesAbout,
} from "../services/ImageServices";
import { useState, useEffect } from "react";

export function useImages() {
    const [imagesData, setImagesData] = useState(null);
    const [imagesProjectData, setImagesProjectData] = useState(null);
    const [imagesAboutData, setimagesAboutData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getImagesProject = async (project_name = "", limit = null) => {
        setLoading(true); // start loading setiap kali fetch
        setError(null); // reset error sebelumnya
        try {
            const response = await fetchImagesProjects(project_name, limit);
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

    const getImagesAbout = async () => {
        setLoading(true); // start loading setiap kali fetch
        setError(null); // reset error sebelumnya
        try {
            const response = await fetcImagesAbout();
            console.log(`Response (all): ${response.message}`);
            setimagesAboutData(response.data);
        } catch (err) {
            setError("Gagal mengambil data gambar");
        } finally {
            setLoading(false);
        }
    };

    const addImagesAbout = async (publicIds) => {
        try {
            await postImagesAbout(publicIds);
            await getImagesAbout();
        } catch (err) {
            console.error("Gagal menambahkan gambar:", err);
        }
    };

    const removeImagesAbout = async (publicIds) => {
        try {
            await deleteImagesAbout(publicIds);
            await getImagesAbout();
        } catch (err) {
            console.error("Gagal menghapus gambar:", err);
        }
    };
    return {
        imagesProjectData,
        imagesAboutData,
        loading,
        error,
        getImagesProject,
        getImagesAbout,
        addImagesAbout,
        removeImagesAbout,
    };
}
