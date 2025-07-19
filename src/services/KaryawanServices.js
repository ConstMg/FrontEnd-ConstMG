import { apiClient } from "./ApiClient";

export const presensi = async (formData) => {
    return apiClient("karyawan/presensi", "POST", formData);
};

export const addKaryawan = async (karyawan) => {
    return await apiClient(`admin/karyawan`, "POST", {
        karyawan,
    });
};

export const updateKaryawan = async (karyawan) => {
    const { id } = karyawan;
    return await apiClient(`admin/karyawan/${id}`, "PUT", karyawan);
};

export const updateKaryawanStatus = async (id, status) => {

    return await apiClient(`admin/karyawan/status/${id}`, "PATCH", { status });
};

export const setRoleKaryawan = async (nama, role) => {
    return await apiClient(`admin/update-role`, "PATCH", {
        nama,
        role,
    });
};
export const getMeData = async () => {
    return await apiClient(`me`, "GET");
};

export const updateMeData = async (data) => {
    return await apiClient(`me/update`, "PUT", data);
}

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
