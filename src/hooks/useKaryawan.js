import {
    presensi,
    getKaryawan,
    deleteKaryawan,
    addKaryawan,
    updateKaryawan,
    setRoleKaryawan
} from "../services/KaryawanServices";
import { useState, useCallback } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export function useKaryawan() {
    const [karyawanData, setKaryawanData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePresensiMasuk = async (
        nama,
        status_presensi,
        latitude,
        longitude,
        deskripsi
    ) => {
        if (!nama || !status_presensi) {
            toast.warn("Mohon lengkapi nama dan status presensi.");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Mohon tunggu sebentar...");

        try {
            const response = await presensi(
                nama,
                status_presensi,
                latitude,
                longitude,
                deskripsi
            );

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
            const response = await getKaryawan(localStorage.getItem("userRole"));
            const data = Array.isArray(response)
                ? response
                : response.data || [];

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

    const handleAddKaryawan = async (
        nama,
        nik,
        jk,
        alamat,
        divisi,
        penempatan,
        email,
        password
    ) => {
        setLoading(true);
        const toastId = toast.loading("Menambahkan data karyawan...");

        try {
            const response = await addKaryawan(
                nama,
                nik,
                jk,
                alamat,
                divisi,
                penempatan,
                email,
                password,
                localStorage.getItem("userRole")
            );
            setKaryawanData((prevData) => [...prevData, response.data]);
            toast.update(toastId, {
                render: "Data karyawan berhasil ditambahkan",
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            console.log("Data karyawan berhasil ditambahkan:", response.data);
            return true;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render: error.message || "Gagal menambahkan data karyawan",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateKaryawan = async (
        id,
        nama,
        nik,
        jk,
        alamat,
        divisi,
        penempatan,
        email,
        password, 
        role = localStorage.getItem("userRole")
    ) => {
        setLoading(true);
        const toastId = toast.loading("Menambahkan data karyawan...");

        try {
            const response = await updateKaryawan(
                id,
                nama,
                nik,
                jk,
                alamat,
                divisi,
                penempatan,
                email,
                password,
                role
            );
            setKaryawanData((prevData) => [...prevData, response.data]);
            toast.update(toastId, {
                render: `Data ${nama} berhasil diupdate`,
                type: "success",
                isLoading: false,
                autoClose: 2000,
            });

            return true;
        } catch (error) {
            setError(error);
            toast.update(toastId, {
                render: error.message || `Gagal mengupdate Data ${nama}`,
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateKaryawanRole = async (nama, role) => {
        setLoading(true);
        const toastId = toast.loading("Mengupdate role karyawan...");

        try {
            await setRoleKaryawan(nama, role);
            setKaryawanData((prevData) =>
                prevData.map((karyawan) =>
                    karyawan.nama === nama ? { ...karyawan, role } : karyawan
                )
            );
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
    }

    return {
        karyawanData,
        loading,
        error,
        handlePresensiMasuk,
        fetchKaryawanData,
        handleDeleteKaryawan,
        handleAddKaryawan,
        handleUpdateKaryawan,
        handleUpdateKaryawanRole
    };
}
