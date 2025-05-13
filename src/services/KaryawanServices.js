import { apiClient } from "./ApiClient";

export const presensiMasuk = async (
  nama,
  status_presensi,
  latitude,
  longitude,
  deskripsi
) => {
    return apiClient("karyawan/presensi/masuk", "POST", {
      nama,
      status_presensi,
      latitude,
      longitude,
      deskripsi,
    });
};

export const presensiKeluar = async (nama, latitude, longitude) => {
  try {
    const response = await apiClient.post("karyawan/presensi/keluar", {
      nama,
      latitude,
      longitude,
    });
    return response.data;
  } catch (error) {
    console.error("Error during presensiKeluar:", error);
    throw error;
  }
};
