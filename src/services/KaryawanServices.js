import { apiClient } from "./ApiClient";

export const presensi = async (
  nama,
  status_presensi,
  latitude,
  longitude,
  deskripsi
) => {
  return apiClient("karyawan/presensi", "POST", {
    nama,
    status_presensi,
    latitude,
    longitude,
    deskripsi,
  });
};

export const getKaryawan = async () => {
  return await apiClient("karyawan", "GET");
};