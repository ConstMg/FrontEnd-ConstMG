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
    return await apiClient(`admin/tambah/karyawan?akses=${userRole}`, "POST", {
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
    password,
    userRole
) => {
    return await apiClient(`admin/karyawan/${id}?akses=${userRole}`, "PUT", {
        nama,
        nik,
        jk,
        alamat,
        divisi,
        penempatan,
        email,
        password
    });
};

export const setRoleKaryawan = async (nama, role) => {
    return await apiClient(`karyawan/update-role`, "PATCH", {
        nama,
        role,
    });
};

export const getKaryawan = async (role) => {
    return await apiClient(`karyawan?role=${role}`, "GET");
};

export const deleteKaryawan = async (id, role) => {
    return await apiClient(`admin/karyawan/${id}?akses=${role}`, "DELETE");
};
