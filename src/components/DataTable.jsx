import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import { useProject } from "../hooks/useProject";
import { useKaryawan } from "../hooks/useKaryawan";
import ConfirmationCard from "./ConfirmationCard";
import ProjectImages from "./ProjectImages";
import ImageFolder from "./ImageFolder";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { formatDateToYMD } from "../utils/utils";
const DataTable = ({
    variant = "karyawan",
    data = [],
    isLoading = false,
    refreshData,
    onEdit, // Add this prop to receive the edit function from parent
}) => {
    const [deleting, setDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showDescription, setShowDescription] = useState(false);
    const [presensiDescription, setPresensiDescription] = useState(null);
    const [descriptionPosition, setDescriptionPosition] = useState({
        top: 0,
        left: 0,
    });
    const descriptionRef = React.useRef(null);
    const [selectedProjectImages, setSelectedProjectImages] = useState(null);
    const [showProjectImages, setShowProjectImages] = useState(false);

    const { handleDeleteProject } = useProject();
    const { handleDeleteKaryawan, handleUpdateKaryawanRole,handleUpdateKaryawanStatus } = useKaryawan();
    library.add(faCircleInfo);

    // Function to show delete confirmation
    const confirmDelete = (id, itemType, name) => {
        setItemToDelete({ id, type: itemType, name });
        setShowConfirmation(true);
    };

    // Function to handle edit button click
    const handleEdit = (item) => {
        if (onEdit) {
            onEdit(item, variant);
        }
    };

    // Update the handleDeskripsiPresensi function
    const handleDeskripsiPresensi = (description, e) => {
        // Get click position for popup placement
        const rect = e.currentTarget.getBoundingClientRect();
        setDescriptionPosition({
            top: rect.bottom + window.scrollY + 5,
            left: rect.left + window.scrollX,
        });

        setPresensiDescription(description);
        setShowDescription(true);
    };

    // Handle delete confirmation
    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        setDeleting(true);
        setDeleteId(itemToDelete.id);

        try {
            if (itemToDelete.type === "karyawan") {
                await handleDeleteKaryawan(itemToDelete.id);
            } else {
                await handleDeleteProject(itemToDelete.id);
            }

            if (refreshData) {
                await refreshData();
            }
        } catch (error) {
            console.error(`Error deleting ${itemToDelete.type}:`, error);
        } finally {
            setDeleting(false);
            setDeleteId(null);
            setShowConfirmation(false);
            setItemToDelete(null);
        }
    };

    // Add a click outside handler to close the description
    React.useEffect(() => {
        function handleClickOutside(event) {
            if (
                descriptionRef.current &&
                !descriptionRef.current.contains(event.target)
            ) {
                setShowDescription(false);
            }
        }

        // Add event listener when description is showing
        if (showDescription) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [showDescription]);

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    if (variant === "karyawan") {
        return (
            <div className="h-full w-full overflow-auto relative">
                {/* Confirmation modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
                        <ConfirmationCard
                            variant="delete"
                            itemname={itemToDelete?.name || "item"}
                            onConfirm={handleDeleteConfirm}
                            onCancel={() => setShowConfirmation(false)}
                        />
                    </div>
                )}

                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
                        <tr>
                            <th className="py-2 px-2 text-left">No.</th>
                            <th className="py-2 px-2 text-left">Nama</th>
                            <th className="py-2 px-2 text-left">NIK</th>
                            <th className="py-2 px-2 text-left">Alamat</th>
                            <th className="py-2 px-2 text-left">Divisi</th>
                            <th className="py-2 px-2 text-left">Email</th>
                            {/* <th className="py-2 px-2 text-left">Password</th> */}
                            <th className="py-2 px-2 text-left">Role</th>
                            <th className="py-2 px-2 text-left">Status</th>
                            <th className="py-2 px-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data && data.length > 0 ? (
                            data.map((karyawan, index) => (
                                <tr
                                    key={karyawan.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }
                                >
                                    <td className="py-2 px-2 border-b">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {karyawan.nama}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {karyawan.nik}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {karyawan.alamat}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {karyawan.divisi}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {karyawan.email}
                                    </td>
                                    {/* <td className="py-2 px-2 border-b">
                                        {karyawan.password}
                                    </td> */}
                                    <td className="py-2 px-2 border-b">
                                        <select
                                            value={karyawan.role}
                                            onChange={async (e) => {
                                                const newRole = e.target.value;
                                                try {
                                                    e.target.disabled = true;
                                                    e.target.classList.add(
                                                        "opacity-50"
                                                    );

                                                    await handleUpdateKaryawanRole(
                                                        karyawan.nama,
                                                        newRole
                                                    );

                                                    if (refreshData) {
                                                        await refreshData();
                                                    }

                                                    e.target.classList.remove(
                                                        "opacity-50"
                                                    );
                                                    e.target.classList.add(
                                                        "bg-green-200"
                                                    );
                                                    setTimeout(() => {
                                                        e.target.classList.remove(
                                                            "bg-green-200"
                                                        );
                                                    }, 1000);
                                                } catch (error) {
                                                    console.error(
                                                        "Failed to update role:",
                                                        error
                                                    );
                                                    e.target.classList.remove(
                                                        "opacity-50"
                                                    );
                                                    e.target.classList.add(
                                                        "bg-red-200"
                                                    );
                                                    setTimeout(() => {
                                                        e.target.classList.remove(
                                                            "bg-red-200"
                                                        );
                                                    }, 1000);
                                                } finally {
                                                    e.target.disabled = false;
                                                }
                                            }}
                                            className={`py-1 px-2 rounded-full ${
                                                karyawan.role === "admin"
                                                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                                                    : "bg-blue-100 text-blue-800 border border-blue-300"
                                            }`}
                                        >
                                            <option
                                                value="admin"
                                                className="py-1 px-2 rounded-full bg-amber-100 text-amber-800 border border-amber-300"
                                            >
                                                Admin
                                            </option>
                                            <option
                                                value="karyawan"
                                                className="py-1 px-2 rounded-full bg-blue-100 text-blue-800 border border-blue-300"
                                            >
                                                Karyawan
                                            </option>
                                        </select>
                                    </td>
                                     <td className="py-2 px-2 border-b">
                                        <select
                                            value={karyawan.status}
                                            onChange={async (e) => {
                                                const newStatus = e.target.value;
                                                try {
                                                    console.log(karyawan.status)
                                                    e.target.disabled = true;
                                                    e.target.classList.add(
                                                        "opacity-50"
                                                    );

                                                    await handleUpdateKaryawanStatus(
                                                        karyawan.id,
                                                        newStatus
                                                    );

                                                    if (refreshData) {
                                                        await refreshData();
                                                    }

                                                    e.target.classList.remove(
                                                        "opacity-50"
                                                    );
                                                    e.target.classList.add(
                                                        "bg-green-200"
                                                    );
                                                    setTimeout(() => {
                                                        e.target.classList.remove(
                                                            "bg-green-200"
                                                        );
                                                    }, 1000);
                                                } catch (error) {
                                                    console.error(
                                                        "Failed to update status:",
                                                        error
                                                    );
                                                    e.target.classList.remove(
                                                        "opacity-50"
                                                    );
                                                    e.target.classList.add(
                                                        "bg-red-200"
                                                    );
                                                    setTimeout(() => {
                                                        e.target.classList.remove(
                                                            "bg-red-200"
                                                        );
                                                    }, 1000);
                                                } finally {
                                                    e.target.disabled = false;
                                                }
                                            }}
                                            className={`py-1 px-2 rounded-full ${
                                                karyawan.status
                                                    ? "bg-green-100 text-green-800 border border-green-300"
                                                    : "bg-red-100 text-red-800 border border-red-300"
                                            }`}
                                        >
                                           <option
                                                value="1"
                                                className="py-1 px-2 rounded-full bg-green-100 text-green-800 border border-green-300"
                                            >
                                                Aktif
                                            </option>

                                            <option
                                                value="0"
                                                className="py-1 px-2 rounded-full bg-red-100 text-red-800 border border-red-300"
                                            >
                                                Non-Aktif
                                            </option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {/* Tambahkan justify-center di sini */}
                                        <div className="flex justify-center items-center gap-3">
                                            <img
                                                src={editIcon}
                                                alt="Edit"
                                                className="cursor-pointer w-5 h-5 hover:scale-110"
                                                onClick={() => handleEdit(karyawan)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-4 text-center text-gray-500"
                                >
                                    Tidak ada data karyawan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
    if (variant === "proyek") {
        return (
            <div className="h-full w-full overflow-auto relative">
                {/* Project Images Modal */}
                {showProjectImages && selectedProjectImages && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <ProjectImages
                            images={selectedProjectImages.images}
                            projectId={selectedProjectImages.project_id}
                            onClose={() => setShowProjectImages(false)}
                            onImageUploaded={refreshData}
                            onImageUploadedCallback={(newImages) => {
                                // Update langsung dari callback
                                setSelectedProjectImages((prev) => ({
                                    ...prev,
                                    images: newImages,
                                }));
                            }}
                        />
                    </div>
                )}

                {/* Confirmation modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
                        <ConfirmationCard
                            variant="delete"
                            itemname={itemToDelete?.name || "item"}
                            onConfirm={handleDeleteConfirm}
                            onCancel={() => setShowConfirmation(false)}
                        />
                    </div>
                )}

                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-50 text-gray-600 sticky top-0 z-20">
                        <tr>
                            <th className="py-2 px-2 text-left">No.</th>
                            <th className="py-2 px-2 text-left">
                                Nama Project
                            </th>
                            <th className="py-2 px-2 text-left">
                                Pemberi Kerja
                            </th>
                            <th className="py-2 px-2 text-left">
                                Tanggal Mulai
                            </th>
                            <th className="py-2 px-2 text-left">
                                Tanggal Selesai
                            </th>
                            <th className="py-2 px-2 text-left">Kategori</th>
                            <th className="py-2 px-2 text-left">
                                Nilai Kontrak
                            </th>
                            <th className="py-2 px-2 text-left">Status</th>
                            <th className="py-2 px-2 text-left">Deskripsi</th>
                            <th className="py-2 px-2 text-center">Gambar</th>
                            <th className="py-2 px-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data && data.length > 0 ? (
                            data.map((project, index) => (
                                <tr
                                    key={project.id || project.project_id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }
                                >
                                    {/* No. */}
                                    <td className="py-2 px-2 border-b">
                                        {index + 1}
                                    </td>

                                    {/* Nama Project */}
                                    <td className="py-2 px-2 border-b align-middle text-center">
                                        {project.project_name?.trim()
                                            ? project.project_name
                                            : "-"}
                                    </td>

                                    {/* Pemberi Kerja */}
                                    <td className="py-2 px-2 border-b text-center align-middle">
                                        {project.pemberi_kerja?.trim()
                                            ? project.pemberi_kerja
                                            : "-"}
                                    </td>

                                    {/* Tanggal Mulai */}
                                    <td className="py-2 px-2 border-b align-middle text-center">
                                        {formatDateToYMD(
                                            project.tanggal_dimulai_proyek
                                        ) || "-"}
                                    </td>

                                    {/* Tanggal Selesai */}
                                    <td className="py-2 px-2 border-b align-middle text-center">
                                        {formatDateToYMD(
                                            project.tanggal_selesai_proyek
                                        ) || "-"}
                                    </td>

                                    {/* Kategori */}
                                    <td className="py-2 px-2 border-b align-middle text-center">
                                        {project.kategori?.trim()
                                            ? project.kategori
                                            : "-"}
                                    </td>

                                    {/* Nilai Kontrak */}
                                    <td className="py-2 px-2 border-b align-middle text-center">
                                        {/* {project.nilai_kontrak
                                            ? project.nilai_kontrak?.toLocaleString(
                                                  "id-ID",
                                                  {
                                                      style: "currency",
                                                      currency: "IDR",
                                                      minimumFractionDigits: 0,
                                                  }
                                              )
                                            : "-"} */}
                                        {project.nilai_kontrak?.toLocaleString(
                                            "id-ID",
                                            {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                            }
                                        ) || "Rp0"}
                                    </td>
                                    <td className="py-2 px-2 border-b align-middle text-center">
                                        {project.status}
                                    </td>
                                    {/* Deskripsi */}
                                    <td className="py-2 px-2 border-b align-middle">
                                        <p className="truncate">
                                            {project.deskripsi !== "-" &&
                                            project.deskripsi.split(/\s+/)
                                                .length > 7
                                                ? project.deskripsi
                                                      .split(/\s+/)
                                                      .slice(0, 7)
                                                      .join(" ") + " ..."
                                                : project.deskripsi}
                                        </p>
                                    </td>

                                    {/* Gambar */}
                                    <td className="py-2 px-2 border-b text-center align-middle">
                                        <div className="flex items-center justify-center">
                                            <ImageFolder
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const formattedImages =
                                                        project.images?.length
                                                            ? project.images.map(
                                                                  (img) => ({
                                                                      secure_url:
                                                                          img.secure_url,
                                                                      public_id:
                                                                          img.public_id,
                                                                  })
                                                              )
                                                            : [];

                                                    setSelectedProjectImages({
                                                        name: project.project_name,
                                                        images: formattedImages,
                                                        project_id:
                                                            project.project_id ||
                                                            project.id,
                                                    });

                                                    setShowProjectImages(true);
                                                }}
                                            />
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="py-2 px-2 border-b">
                                        <div className="flex gap-3 items-center">
                                            <img
                                                src={editIcon}
                                                alt="Edit"
                                                className="cursor-pointer w-5 h-5 hover:scale-110"
                                                onClick={() =>
                                                    handleEdit(project)
                                                }
                                            />
                                            <img
                                                src={deleteIcon}
                                                alt="Delete"
                                                className={`cursor-pointer w-5 h-5 ${
                                                    deleting &&
                                                    deleteId ===
                                                        project.project_id
                                                        ? "opacity-50"
                                                        : "hover:scale-110"
                                                }`}
                                                onClick={() =>
                                                    confirmDelete(
                                                        project.project_id,
                                                        "proyek",
                                                        project.project_name
                                                    )
                                                }
                                                disabled={
                                                    deleting &&
                                                    deleteId ===
                                                        project.project_id
                                                }
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-4 text-center text-gray-500"
                                >
                                    Tidak ada data proyek
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
    if (variant === "presensi") {
        return (
            <div className="h-full w-full overflow-auto relative">
                {showDescription && (
                    <div
                        ref={descriptionRef}
                        className="fixed bg-white shadow-xl p-4 rounded-md z-50 max-w-md border border-gray-200"
                        style={{
                            top: `${descriptionPosition.top}px`,
                            left: `${descriptionPosition.left}px`,
                        }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-black bold">
                                Keterangan
                            </h3>
                        </div>
                        <div className="text-gray-500 text-sm">
                            {presensiDescription
                                ? presensiDescription
                                : "Tidak ada keterangan"}
                        </div>
                    </div>
                )}
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
                        <tr>
                            <th className="py-2 px-2 text-left">No.</th>
                            <th className="py-2 px-2 text-left">Nama</th>
                            <th className="py-2 px-2 text-left">Jam Masuk</th>
                            <th className="py-2 px-2 text-left">Jam Keluar</th>
                            <th className="py-2 px-2 text-left">Status</th>
                            <th className="py-2 px-2 text-left">
                                Bukti Sakit atau Izin
                            </th>
                            <th className="py-2 px-2 text-center">Lokasi</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data && data.length > 0 ? (
                            data.map((presensi, index) => (
                                <tr
                                    key={presensi.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }
                                >
                                    <td className="py-2 px-2 border-b">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {presensi.nama}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {presensi.status_presensi === "Hadir"
                                            ? presensi.jam_masuk
                                            : "-"}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {presensi.jam_keluar
                                            ? presensi.jam_keluar
                                            : "-"}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {presensi.status_presensi + " "}
                                        {presensi.status_presensi !==
                                            "Hadir" && (
                                            <FontAwesomeIcon
                                                icon={faCircleInfo}
                                                className="cursor-pointer"
                                                onClick={(e) => {
                                                    handleDeskripsiPresensi(
                                                        presensi.deskripsi,
                                                        e
                                                    );
                                                    e.stopPropagation(); // Prevent event bubbling
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td className="py-2 px-2 border-b">
                                        {presensi.gambar ? (
                                            <a
                                                href={presensi.gambar}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 underline"
                                            >
                                                Lihat Gambar
                                            </a>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="py-2 px-2 border-b text-center">
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${presensi.latitude},${presensi.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Cek Lokasi
                                        </a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="py-4 text-center text-gray-500"
                                >
                                    Tidak ada data {variant}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    return null;
};

export default DataTable;
