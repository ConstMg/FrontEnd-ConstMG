import {
    fetchImagesProjects,
    fetcImagesAbout,
    postImagesAbout,
    deleteImagesAbout,
} from "../services/ImageServices";
import { useState, useCallback, useEffect } from "react";

export function useImages() {
    const [imagesData, setImagesData] = useState(null);
    const [imagesProjectData, setImagesProjectData] = useState(null);
    const [imagesAboutData, setimagesAboutData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getImages = useCallback(async (project_name = "", limit = null) => {
        setLoading(true); // start loading setiap kali fetch
        setError(null); // reset error sebelumnya
        try {
            const response = await fetchImagesProjects(project_name, limit);
            // Memastikan response.data adalah array, atau default ke array kosong
            console.log("Response from fetchImagesProjects:", response);

            const imageDataArray =
                response && Array.isArray(response.data) ? response.data : [];

            if (project_name.trim() === "") {
                // console.log(`Response (all projects images): ${response?.message}`);
                const allImages = imageDataArray.flatMap(
                    (project) => project.images || []
                );
                setImagesData(allImages);
                // Simpan array gambar ke imagesData
            } else {
                // console.log(
                //     `Response (project "${project_name}" images): ${response?.message}`
                // );
                setImagesProjectData(imageDataArray); // Simpan array gambar spesifik proyek
            }
            return imageDataArray; // Kembalikan data yang diambil untuk penggunaan langsung jika perlu
        } catch (err) {
            console.error("Error in getImagesProject:", err);
            setError("Gagal mengambil data gambar proyek");
            return []; // Kembalikan array kosong jika terjadi error
        } finally {
            setLoading(false);
        }
    }, []); // Tambahkan array dependensi kosong untuk useCallback

    const getImagesProject = async (project_name = "", limit = null) => {
        setLoading(true); // start loading setiap kali fetch
        setError(null); // reset error sebelumnya
        try {
            const response = await fetchImagesProjects(project_name, limit);
            if (project_name.trim() === "") {
                console.log(`Response (all): ${response.message}`);
                const allImages = imageDataArray.flatMap(
                    (project) => project.images || []
                );
                setImagesData(allImages);
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
        imagesData,
        getImages,
        getImagesProject,
        getImagesAbout,
        addImagesAbout,
        removeImagesAbout,
    };
}
