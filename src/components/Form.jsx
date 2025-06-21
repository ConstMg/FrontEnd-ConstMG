import React, { useState, useEffect } from "react";
import { useKaryawan } from "../hooks/useKaryawan";
import { useProject } from "../hooks/useProject";

const Form = ({
    variant = "add",
    itemType = "karyawan",
    onConfirm,
    onCancel,
    initialData = null,
}) => {
    const {
        handleUpdateKaryawan,
        handleAddKaryawan,
        loading: karyawanLoading,
    } = useKaryawan();
    const {
        handleAddProject,
        handleUpdateProject,
        loading: projectLoading,
    } = useProject();

    const config = {
        update: {
            karyawan: {
                title: "Update Data Karyawan",
                confirmBtnClass:
                    "bg-amber-500 hover:bg-amber-600 border-amber-500 hover:border-amber-600", // Slightly darker hover
                confirmText: "Update",
            },
            proyek: {
                title: "Update Data Proyek",
                confirmBtnClass:
                    "bg-amber-500 hover:bg-amber-600 border-amber-500 hover:border-amber-600",
                confirmText: "Update",
            },
        },
        add: {
            karyawan: {
                title: "Tambah Data Karyawan",
                confirmBtnClass:
                    "bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600",
                confirmText: "Tambah",
            },
            proyek: {
                title: "Tambah Data Proyek",
                confirmBtnClass:
                    "bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600",
                confirmText: "Tambah",
            },
        },
    };

    const currentConfig = config[variant]?.[itemType] || config.add.karyawan;
    const isLoading = karyawanLoading || projectLoading;

    const initialKaryawanState = {
        nama: "",
        nik: "",
        jk: "Laki-laki",
        alamat: "",
        divisi: "",
        penempatan: "",
        email: "",
        password: "",
    };

    const initialProyekState = {
        project_name: "",
        deskripsi: "",
        status: "Ongoing", // Assuming 'status' is part of project data
    };

    const [formData, setFormData] = useState(
        itemType === "karyawan" ? initialKaryawanState : initialProyekState
    );

    const divisi = [
        "Komisaris",
        "Direktur",
        "Finance",
        "Accounting",
        "MG. Operasional",
        "Op. Support",
        "QC",
        "Engginering",
        "Commercial",
    ];

    const [error, setError] = useState(null);

    useEffect(() => {
        if (initialData && variant === "update") {
            if (itemType === "karyawan") {
                setFormData({
                    nama: initialData.nama || "",
                    nik: initialData.nik || "",
                    jk: initialData.jk || "Laki-laki",
                    alamat: initialData.alamat || "",
                    divisi: initialData.divisi || "",
                    penempatan: initialData.penempatan || "",
                    email: initialData.email || "",
                    password: "", // Password tidak diisi ulang untuk update
                });
            } else {
                // proyek
                setFormData({
                    project_name: initialData.project_name || "",
                    deskripsi: initialData.deskripsi || "",
                    status: initialData.status || "Ongoing",
                });
            }
        } else {
            // Reset form when variant/itemType changes or for add mode
            setFormData(
                itemType === "karyawan"
                    ? initialKaryawanState
                    : initialProyekState
            );
        }
    }, [initialData, variant, itemType]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            if (variant === "add") {
                if (itemType === "karyawan") {
                    await handleAddKaryawan(
                        formData.nama,
                        formData.nik,
                        formData.jk,
                        formData.divisi,
                        formData.alamat,
                        formData.penempatan,
                        formData.email,
                        formData.password
                    );
                } else {
                    // proyek
                    await handleAddProject(
                        formData.project_name,
                        formData.deskripsi,
                        formData.status // Assuming status is sent
                    );
                }
            } else if (
                variant === "update" &&
                (initialData?.id || initialData?.project_id)
            ) {
                if (itemType === "karyawan") {
                    if (typeof handleUpdateKaryawan === "function") {
                        await handleUpdateKaryawan(
                            initialData.id,
                            formData.nama,
                            formData.nik,
                            formData.jk,
                            formData.divisi,
                            formData.alamat,
                            formData.penempatan,
                            formData.email,
                            formData.password // Kirim password jika diisi, backend harus handle jika kosong
                        );
                    }
                } else {
                    // proyek
                    if (typeof handleUpdateProject === "function") {
                        await handleUpdateProject(
                            initialData.project_id,
                            formData.project_name,
                            formData.deskripsi,
                            formData.status
                        );
                    }
                }
            }
            if (onConfirm) {
                await onConfirm(formData);
            }
        } catch (err) {
            console.error("Form submission error:", err);
            setError(
                `Gagal ${variant === "add" ? "menambahkan" : "memperbarui"} ${
                    itemType === "karyawan" ? "karyawan" : "proyek"
                }. ${
                    err.response?.data?.message ||
                    err.message ||
                    "Terjadi kesalahan"
                }`
            );
        }
    };

    const commonInputClass =
        "mt-1 block w-full px-3.5 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-500 sm:text-sm transition-colors duration-150 ease-in-out";

    const renderKaryawanFields = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama */}
            <div>
                <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Nama
                </label>
                <input
                    type="text"
                    id="nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    required
                    className={commonInputClass}
                />
            </div>
            {/* NIK */}
            <div>
                <label
                    htmlFor="nik"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    NIK
                </label>
                <input
                    type="text"
                    id="nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    required
                    className={commonInputClass}
                />
            </div>
            {/* Jenis Kelamin */}
            <div>
                <label
                    htmlFor="jk"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Jenis Kelamin
                </label>
                <select
                    id="jk"
                    name="jk"
                    value={formData.jk}
                    onChange={handleChange}
                    required
                    className={commonInputClass}
                >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            {/* Divisi */}
            <div>
                <label
                    htmlFor="divisi"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Divisi
                </label>
                <select
                    id="divisi"
                    name="divisi"
                    value={formData.divisi}
                    onChange={handleChange}
                    required
                    className={commonInputClass}
                >
                    <option value="">Pilih Divisi</option>
                    {divisi.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={commonInputClass}
                />
            </div>
            {/* Penempatan */}
            <div>
                <label
                    htmlFor="penempatan"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Penempatan
                </label>
                <input
                    type="text"
                    id="penempatan"
                    name="penempatan"
                    value={formData.penempatan}
                    onChange={handleChange}
                    required
                    className={commonInputClass}
                />
            </div>
            {/* Password */}
            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Password{" "}
                    {variant === "update" && (
                        <span className="text-xs text-gray-500">
                            (Biarkan kosong jika tidak ingin mengubah)
                        </span>
                    )}
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={variant === "add"}
                    className={commonInputClass}
                />
            </div>
            {/* Alamat */}
            <div>
                <label
                    htmlFor="alamat"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Alamat
                </label>
                <textarea
                    id="alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                    rows="3"
                    className={commonInputClass}
                ></textarea>
            </div>
        </div>
    );

    const renderProjectFields = () => (
        <>
            {/* Nama Proyek */}
            <div>
                <label
                    htmlFor="project_name"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Nama Proyek
                </label>
                <input
                    type="text"
                    id="project_name"
                    name="project_name"
                    value={formData.project_name}
                    onChange={handleChange}
                    required
                    className={commonInputClass}
                />
            </div>
            {/* Deskripsi */}
            <div>
                <label
                    htmlFor="deskripsi"
                    className="block text-sm font-medium text-gray-700 mb-0.5"
                >
                    Deskripsi
                </label>
                <textarea
                    id="deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    rows="4"
                    className={`${commonInputClass} h-80`}
                ></textarea>
            </div>
        </>
    );

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-5/6 max-w-3xl max-h-[80vh] overflow-y-auto z-[100]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800">
                    {currentConfig.title}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-100 transition"
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="mb-5 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm">
                    <strong className="font-semibold">Oops!</strong> {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {itemType === "karyawan"
                    ? renderKaryawanFields()
                    : renderProjectFields()}

                {/* Footer Buttons */}
                <div className="flex justify-end items-center gap-3 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white ${
                            currentConfig.confirmBtnClass
                        } focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white transition ${
                            isLoading
                                ? "opacity-60 cursor-not-allowed"
                                : "hover:shadow-md"
                        }`}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <svg
                                    className="animate-spin h-4 w-4 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Memproses...
                            </span>
                        ) : (
                            currentConfig.confirmText
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
