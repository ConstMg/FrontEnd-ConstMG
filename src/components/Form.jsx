import React, { useState, useEffect } from "react";
import { useKaryawan } from "../hooks/useKaryawan";
import { useProject } from "../hooks/useProject";

const Form = ({
    variant = "add",
    itemType = "karyawan", // New prop to determine form type
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

    // Combined config with karyawan and project variants
    const config = {
        update: {
            karyawan: {
                title: "Update Data Karyawan",
                confirmBtnClass:
                    "bg-amber-500 hover:bg-transparent border-amber-500 hover:text-amber-500",
                confirmText: "Update",
            },
            proyek: {
                title: "Update Data Proyek",
                confirmBtnClass:
                    "bg-amber-500 hover:bg-transparent border-amber-500 hover:text-amber-500",
                confirmText: "Update",
            },
        },
        add: {
            karyawan: {
                title: "Tambah Data Karyawan",
                confirmBtnClass:
                    "bg-green-500 hover:bg-transparent border-green-500 hover:text-green-500",
                confirmText: "Tambah",
            },
            proyek: {
                title: "Tambah Data Proyek",
                confirmBtnClass:
                    "bg-green-500 hover:bg-transparent border-green-500 hover:text-green-500",
                confirmText: "Tambah",
            },
        },
    };

    const currentConfig = config[variant]?.[itemType] || config.add.karyawan;
    const isLoading = karyawanLoading || projectLoading;

    // Initialize state based on form type
    const [formData, setFormData] = useState(
        itemType === "karyawan"
            ? {
                  nama: "",
                  nik: "",
                  jk: "Laki-laki",
                  alamat: "",
                  divisi: "",
                  penempatan: "",
                  email: "",
                  password: "",
              }
            : {
                  project_name: "",
                  deskripsi: "",
                  status: "Ongoing",
              }
    );

    // Division options for karyawan form
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

    // If initialData is provided (for update), populate the form
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
                    password: "", // Don't populate password for security reasons
                });
            } else {
                setFormData({
                    project_name: initialData.project_name || "",
                    deskripsi: initialData.deskripsi || "",
                    status: initialData.status || "Ongoing",
                });
            }
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
                    // Handle karyawan add
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
                    // Handle project add
                    await handleAddProject(
                        formData.project_name,
                        formData.deskripsi
                    );
                }
            } else if (variant === "update" && (initialData?.id || initialData?.project_id)) {
                if (itemType === "karyawan") {
                    // Handle karyawan update if available
                    if (typeof handleUpdateKaryawan === "function") {
                        console.log("Updating karyawan with ID:", initialData);
                        await handleUpdateKaryawan(
                            initialData.id,
                            formData.nama,
                            formData.nik,
                            formData.jk,
                            formData.divisi,
                            formData.alamat,
                            formData.penempatan,
                            formData.email,
                            formData.password || initialData.password
                        );
                    }
                } else {
                    console.log("Updating project with ID:", initialData);
                    if (typeof handleUpdateProject === "function") {
                        await handleUpdateProject(
                            initialData.project_id,
                            formData.project_name,
                            formData.deskripsi
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
                }: ${err.message || "Terjadi kesalahan"}`
            );
        }
    };

    // Render karyawan form fields
    const renderKaryawanFields = () => (
        <>
            <div>
                <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>

            <div>
                <label
                    htmlFor="nik"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>

            <div>
                <label
                    htmlFor="jk"
                    className="block text-sm font-medium text-gray-700"
                >
                    Jenis Kelamin
                </label>
                <select
                    id="jk"
                    name="jk"
                    value={formData.jk}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                    <option value="Laki-Laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>

            <div>
                <label
                    htmlFor="alamat"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                ></textarea>
            </div>

            <div>
                <label
                    htmlFor="divisi"
                    className="block text-sm font-medium text-gray-700"
                >
                    Divisi
                </label>
                <select
                    id="divisi"
                    name="divisi"
                    value={formData.divisi}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                >
                    <option value="">Pilih Divisi</option>
                    {divisi.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label
                    htmlFor="penempatan"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
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
                    required={variant === "add"} // Only required for add, not update
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>
        </>
    );

    // Render project form fields
    const renderProjectFields = () => (
        <>
            <div>
                <label
                    htmlFor="project_name"
                    className="block text-sm font-medium text-gray-700"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>

            <div>
                <label
                    htmlFor="deskripsi"
                    className="block text-sm font-medium text-gray-700"
                >
                    Deskripsi
                </label>
                <textarea
                    id="deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
            </div>
        </>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    {currentConfig.title}
                </h2>
                <button
                    type="button"
                    onClick={onCancel}
                    className="cursor-pointer text-red-500 hover:text-red-700 transition duration-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Render fields based on itemType */}
                {itemType === "karyawan"
                    ? renderKaryawanFields()
                    : renderProjectFields()}

                <div className="flex justify-end pt-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${currentConfig.confirmBtnClass} disabled:opacity-50`}
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <svg
                                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Processing...
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
