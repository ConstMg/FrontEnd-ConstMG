import { presensi, getKaryawan, deleteKaryawan } from "../services/KaryawanServices";
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
      const response = await getKaryawan();
      const data = Array.isArray(response) ? response : response.data || [];

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
      await deleteKaryawan(id);
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

  return {
    karyawanData,
    loading,
    error,
    handlePresensiMasuk,
    fetchKaryawanData,
    handleDeleteKaryawan,
  };
}
