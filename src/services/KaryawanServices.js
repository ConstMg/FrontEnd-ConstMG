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
    password
) => {
    return await apiClient("admin/tambah/karyawan", "POST", {
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
    return await apiClient(`karyawan/update-role`, "PATCH", {
        nama,
        role,
    });
};

export const getKaryawan = async () => {
    return await apiClient("karyawan", "GET");
};

export const deleteKaryawan = async (id) => {
    return await apiClient(`admin/karyawan/${id}`, "DELETE");
};
