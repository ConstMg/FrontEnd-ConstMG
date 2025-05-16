import React, { useState } from "react";
import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import { useProject } from "../hooks/useProject";
import { useKaryawan } from "../hooks/UseKaryawan";
import ConfirmationCard from "./confirmationCard";

const DataTable = ({
    variant = "karyawan",
    data = [],
    isLoading = false,
    refreshData,
}) => {
    const [deleting, setDeleting] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    
    const { handleDeleteProject } = useProject();
    const { handleDeleteKaryawan } = useKaryawan();

    // Function to show delete confirmation
    const confirmDelete = (id, type, name) => {
        setItemToDelete({ id, type, name });
        setShowConfirmation(true);
    };

    // Function to handle delete confirmation
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
            
            // Refresh data after successful deletion
            if (refreshData) {
                await refreshData();
            }
        } catch (error) {
            console.error(`Error deleting ${itemToDelete.nama}:`, error);
        } finally {
            setDeleting(false);
            setDeleteId(null);
            setShowConfirmation(false);
            setItemToDelete(null);
        }
    };

    // Function to cancel delete
    const handleDeleteCancel = () => {
        setShowConfirmation(false);
        setItemToDelete(null);
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="h-full w-full relative">
            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <ConfirmationCard 
                        variant="delete"
                        itemType={itemToDelete?.type}
                        itemname={itemToDelete?.name}
                        onConfirm={handleDeleteConfirm}
                        onCancel={handleDeleteCancel}
                    />
                </div>
            )}
            
            {/* Karyawan Table */}
            {variant === "karyawan" && (
                <div className="h-full w-full overflow-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        {/* Table header */}
                        <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
                            <tr>
                                <th className="py-2 px-2 text-left">No.</th>
                                <th className="py-2 px-2 text-left">Nama</th>
                                <th className="py-2 px-2 text-left">NIK</th>
                                <th className="py-2 px-2 text-left">Jenis Kelamin</th>
                                <th className="py-2 px-2 text-left">Divisi</th>
                                <th className="py-2 px-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {data && data.length > 0 ? (
                                data.map((karyawan, index) => (
                                    <tr
                                        key={karyawan.id}
                                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                    >
                                        <td className="py-2 px-2 border-b">{index + 1}</td>
                                        <td className="py-2 px-2 border-b">{karyawan.nama}</td>
                                        <td className="py-2 px-2 border-b">{karyawan.nik}</td>
                                        <td className="py-2 px-2 border-b">{karyawan.jk}</td>
                                        <td className="py-2 px-2 border-b">{karyawan.divisi}</td>
                                        <td className="py-2 px-2 border-b">
                                            <div className="flex gap-3 items-center">
                                                <img
                                                    src={editIcon}
                                                    alt="Edit"
                                                    className="cursor-pointer w-5 h-5"
                                                />
                                                <img
                                                    src={deleteIcon}
                                                    alt="Delete"
                                                    className={`cursor-pointer w-5 h-5 ${
                                                        deleting && deleteId === karyawan.id 
                                                            ? "opacity-50" 
                                                            : "hover:scale-110"
                                                    }`}
                                                    onClick={() => confirmDelete(karyawan.id, "karyawan",karyawan.nama)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="py-4 text-center text-gray-500">
                                        Tidak ada data karyawan
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            
            {/* Project Table */}
            {variant === "proyek" && (
                <div className="h-full w-full overflow-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
                            <tr>
                                <th className="py-2 px-2 text-left">No.</th>
                                <th className="py-2 px-2 text-left">Nama Project</th>
                                <th className="py-2 px-2 text-left">Tanggal</th>
                                <th className="py-2 px-2 text-left">Lokasi</th>
                                <th className="py-2 px-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {data && data.length > 0 ? (
                                data.map((project, index) => (
                                    <tr
                                        key={project.id}
                                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                                    >
                                        <td className="py-2 px-2 border-b">{index + 1}</td>
                                        <td className="py-2 px-2 border-b">{project.project_name}</td>
                                        <td className="py-2 px-2 border-b">
                                            {new Date(project.tanggal).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="py-2 px-2 border-b">{project.lokasi}</td>
                                        <td className="py-2 px-2 border-b">
                                            <div className="flex gap-3 items-center">
                                                <img
                                                    src={editIcon}
                                                    alt="Edit"
                                                    className="cursor-pointer w-5 h-5"
                                                />
                                                <img
                                                    src={deleteIcon}
                                                    alt="Delete"
                                                    className={`cursor-pointer w-5 h-5 ${
                                                        deleting && deleteId === project.project_id 
                                                            ? "opacity-50" 
                                                            : "hover:scale-110"
                                                    }`}
                                                    onClick={() => confirmDelete(project.project_id, "project", project.project_name)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-4 text-center text-gray-500">
                                        Tidak ada data proyek
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DataTable;
