import {
    presensi,
    getKaryawan,
    deleteKaryawan,
    addKaryawan,
    updateKaryawan,
    updateKaryawanStatus,
    setRoleKaryawan,
    getPresensiKaryawan,
    getPresensiKaryawanByDate,
    getMeData,
    getRiwayatPresensi,
    updateMeData,
} from "../services/KaryawanServices";
import { useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { saveUserToLocalStorage } from "../utils/utils";

export function useKaryawan() {
    const [karyawanData, setKaryawanData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePresensiMasuk = async (formData) => {
        // Ambil status_presensi dari objek formData untuk validasi
        const statusPresensi = formData.get("status_presensi");

        if (!statusPresensi) {
            toast.warn("Mohon lengkapi status presensi anda.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Mohon tunggu sebentar...");

        try {
            // Teruskan SELURUH objek formData ke fungsi presensi
            const response = await presensi(formData);
            toast.update(toastId, {
                render: response.message || "Presensi berhasil!",
                type: "success",
                isLoading: false,
                autoClose: 3000,
            });

            return response;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render: error.message || "Terjadi kesalahan saat presensi.",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchKaryawanData = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getKaryawan(
                localStorage.getItem("userRole")
            );
            const data = Array.isArray(response)
                ? response
                : response.data || [];
            // console.log("Data Karyawan:", data[0].status);
            setKaryawanData(data);

            return data;
        } catch (error) {
            setError(error);

            toast.update(toastId, {
                render: error.message || "Gagal memuat data karyawan",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchMeData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getMeData();
            saveUserToLocalStorage(response);
            return response;
        } catch (error) {
            setError(error);
            toast.error(error.message || "Gagal memuat data profil");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

     const updateDataMe = useCallback(async (data) => {
        setLoading(true);
        try {
            // 1. Panggil fungsi API yang sebenarnya, bukan memanggil diri sendiri
            const response = await updateMeData(data); 
            
            saveUserToLocalStorage(response);
            toast.success("Data profil berhasil diperbarui");
            return response;
        } catch (error) {
            setError(error);
            toast.error(error.message || "Gagal memperbarui data profil");
            return null;
        } finally {
            // 2. Pastikan loading selalu dihentikan
            setLoading(false); 
        }
    }, []); // Dependency array kosong jika tidak ada dependensi


    const handleDeleteKaryawan = async (id) => {
        setLoading(true);
        const toastId = toast.loading("Menghapus data karyawan...");

        try {
            await deleteKaryawan(id, localStorage.getItem("userRole"));
            setKaryawanData((prevData) =>
                prevData.filter((karyawan) => karyawan.id !== id)
            );
            toast.update(toastId, {
                render: "Data karyawan berhasil dihapus",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            return true;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render: error.message || "Gagal menghapus data karyawan",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleAddKaryawan = async (karyawan) => {
        setLoading(true);
        const toastId = toast.loading("Menambahkan data karyawan...");

        try {
            const response = await addKaryawan({
                ...karyawan,
                role: localStorage.getItem("userRole"), // Inject role
            });

            setKaryawanData((prevData) => [...prevData, response.data]);

            toast.update(toastId, {
                render: "Data karyawan berhasil ditambahkan",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            return true;
        } catch (error) {

            let errorMessage = "Gagal menambahkan data karyawan";

            if (error.response?.data?.errors) {
                errorMessage = Object.values(error.response.data.errors)
                    .flat()
                    .join(", ");
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            setError(errorMessage);

            toast.update(toastId, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateKaryawan = async (karyawan) => {
        setLoading(true);
        const toastId = toast.loading("Memperbarui data karyawan...");

        try {
            const response = await updateKaryawan(karyawan);

            setKaryawanData((prevData) =>
                prevData.map((k) => (k.id === karyawan.id ? response.data : k))
            );

            // Cek apakah perlu update localStorage
            if (
                response.data.role === karyawan.role &&
                response.data.id == localStorage.getItem("userId")
            ) {
                saveUserToLocalStorage(response.data);
            }

            toast.update(toastId, {
                render: `Data ${karyawan.nama} berhasil diupdate`,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            return true;
        } catch (error) {
            toast.update(toastId, {
                render:
                    error.message || `Gagal mengupdate Data ${karyawan.nama}`,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateKaryawanRole = async (nama, role) => {
        setLoading(true);
        const toastId = toast.loading("Mengupdate role karyawan...");

        try {
            const response = await setRoleKaryawan(nama, role);
            setKaryawanData((prevData) =>
                prevData.map((karyawan) =>
                    karyawan.nama === nama ? { ...karyawan, role } : karyawan
                )
            );
            const currentUserID = localStorage.getItem("userId");
            if (String(response.data.id) === currentUserID) {
                localStorage.setItem("userRole", role);
            }
            toast.update(toastId, {
                render: "Role karyawan berhasil diupdate",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            return true;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render: error.message || "Gagal mengupdate role karyawan",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateKaryawanStatus = async (id, status) => {
        const loggedInUserIdString = localStorage.getItem("userId");
        const loggedInUserId = parseInt(loggedInUserIdString, 10);

        if (id === loggedInUserId && status === '0') {
            toast.error("Anda tidak dapat menonaktifkan akun Anda sendiri.");
            return; 
        }

        setLoading(true);
        const toastId = toast.loading("Mengupdate status karyawan...");
        
        try {
            await updateKaryawanStatus(id, status);

            setKaryawanData((prevData) =>
                prevData.map((karyawan) =>
                    karyawan.id === id ? { ...karyawan, status } : karyawan
                )
            );
            
            toast.update(toastId, {
                render: "Status karyawan berhasil diupdate",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            return true;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render: error.message || "Gagal mengupdate status karyawan",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const fetchPresensiAllKaryawan = useCallback(async () => {
        setLoading(true);

        try {
            const response = await getPresensiKaryawan();

            return response.data;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render: error.message || "Gagal memuat data presensi",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });

            return [];
        } finally {
            setLoading(false);
        }
    }, []);
    const fetchPresensiByDate = useCallback(async (date) => {
        setLoading(true);

        try {
            const response = await getPresensiKaryawanByDate(date);
            return response.data;
        } catch (error) {
            setError(error);

            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchRiwayatPresensi = async (nama) => {
        setLoading(true);

        try {
            const response = await getRiwayatPresensi(nama);
            return response;
        } catch (error) {
            setError(error);
            toast.error(error.message || "Gagal memuat riwayat presensi");
            return [];
        } finally {
            setLoading(false);
        }
    };

    return {
        karyawanData,
        loading,
        error,
        handlePresensiMasuk,
        fetchKaryawanData,
        handleDeleteKaryawan,
        handleAddKaryawan,
        handleUpdateKaryawan,
        handleUpdateKaryawanRole,
        fetchPresensiAllKaryawan,
        fetchPresensiByDate,
        handleUpdateKaryawanStatus,
        fetchRiwayatPresensi,
        fetchMeData,
        updateDataMe,
       
    };
}
