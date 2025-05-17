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

export const addKaryawan = async (
  nama,
  nik,
  jk,
  divisi,
  alamat,
  penempatan,
  email,
  password,
  userRole
) => {
  return await apiClient(`admin/karyawan`, "POST", {
    nama,
    nik,
    jk,
    alamat,
    divisi,
    penempatan,
    email,
    password,
  });
};

export const updateKaryawan = async (
  id,
  nama,
  nik,
  jk,
  divisi,
  alamat,
  penempatan,
  email,
  password
) => {
  return await apiClient(`admin/karyawan/${id}`, "PUT", {
    nama,
    nik,
    jk,
    alamat,
    divisi,
    penempatan,
    email,
    password,
  });
};

export const setRoleKaryawan = async (nama, role) => {
  return await apiClient(`admin/update-role`, "PATCH", {
    nama,
    role,
  });
};

export const getKaryawan = async () => {
  return await apiClient(`admin/karyawan`, "GET");
};

export const getPresensiKaryawan = async (nama = null, tanggal_awal = null, tanggal_akhir = null) => {
  const params = {};
  if (nama) params.nama = nama;
  if (tanggal_awal) params.tanggal_awal = tanggal_awal;
  if (tanggal_akhir) params.tanggal_akhir = tanggal_akhir;
  
  return await apiClient(`admin/presensi`, "GET", Object.keys(params).length > 0 ? params : undefined);
};

export const deleteKaryawan = async (id) => {
  return await apiClient(`admin/karyawan/${id}`, "DELETE");
};
