import { presensi } from "../services/KaryawanServices";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export function useKaryawan() {
  // const [karyawan, setKaryawan] = useState(null);
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
    const toastId = toast.loading("Mohon tunggu sebentar..."); // simpan toast ID

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

  return { loading, error, handlePresensiMasuk };
}
