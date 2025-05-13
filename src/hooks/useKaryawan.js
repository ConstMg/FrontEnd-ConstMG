import { presensiMasuk, presensiKeluar } from "../services/KaryawanServices";
import { useState } from "react";

export function useKaryawan() {
  const [karyawan, setKaryawan] = useState(null);
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
      alert("Mohon lengkapi nama dan status presensi.");
      return;
    }

    setLoading(true);

    try {
      const response = await presensiMasuk(
        nama,
        status_presensi,
        latitude,
        longitude,
        deskripsi
      );
      alert(response.message);
      return response;
      //   setKaryawan(response.data);
    } catch (error) {
      alert(error.message || "Terjadi kesalahan saat presensi.");
    } finally {
      setLoading(false);
    }
  };

  const handlePresensiKeluar = async (nama, latitude, longitude) => {
    setLoading(true);
    try {
      const response = await presensiKeluar(nama, latitude, longitude);
      setKaryawan(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { karyawan, loading, error, handlePresensiMasuk };
}
