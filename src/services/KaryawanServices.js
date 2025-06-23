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

export const addKaryawan = async (karyawan) => {
    return await apiClient(`admin/karyawan`, "POST", {
        karyawan,
    });
};

export const updateKaryawan = async (karyawan) => {
    const { id } = karyawan;
    console.log(id);
    return await apiClient(`admin/karyawan/${id}`, "PUT", karyawan);
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

export const getPresensiKaryawan = async () => {
    return await apiClient(`admin/presensi`, "GET");
};
export const getPresensiKaryawanByDate = async (date) => {
    return await apiClient(`admin/presensi?tanggal_awal=${date}`, "GET");
};
export const getRiwayatPresensi = async (nama) => {
    return await apiClient(`karyawan/presensi/riwayat?nama=${nama}`, "GET");
};

export const deleteKaryawan = async (id) => {
    return await apiClient(`admin/karyawan/${id}`, "DELETE");
};
