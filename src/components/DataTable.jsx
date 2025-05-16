import React from "react";
import editIcon from "../assets/edit.svg";

const DataTable = ({ variant = "karyawan", data = [], isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    // Render karyawan table
    if (variant === "karyawan") {
        return (
            <div className="h-full w-full overflow-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
                        <tr>
                            <th className="py-4 px-2 text-left bg-gray-50 border-b border-gray-200">
                                No.
                            </th>
                            <th className="py-4 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Nama
                            </th>
                            <th className="py-4 px-2 text-left bg-gray-50 border-b border-gray-200">
                                NIK
                            </th>
                            <th className="py-4 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Jenis Kelamin
                            </th>
                            <th className="py-4 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Divisi
                            </th>
                            <th className="py-4 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Penempatan
                            </th>
                            <th className="py-4 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Email
                            </th>
                            <th className="py-4 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Actions
                            </th>
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
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {karyawan.nama}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {karyawan.nik}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {karyawan.jk}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {karyawan.divisi}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {karyawan.penempatan}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {karyawan.email}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        <img
                                            src={editIcon}
                                            alt=""
                                            className="cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="10"
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

    // Render project table
    if (variant === "proyek") {
        return (
            <div className="h-full w-full overflow-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-50 text-gray-600 sticky top-0 z-10">
                        <tr>
                            <th className="py-2 px-2 text-left bg-gray-50 border-b border-gray-200">
                                No.
                            </th>
                            <th className="py-2 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Nama Project
                            </th>
                            <th className="py-2 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Tanggal
                            </th>
                            <th className="py-2 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Lokasi
                            </th>
                            <th className="py-2 px-2 text-left bg-gray-50 border-b border-gray-200">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {data && data.length > 0 ? (
                            data.map((project, index) => (
                                <tr
                                    key={project.id}
                                    className={
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    }
                                >
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {index + 1}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {project.nama}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {new Date(
                                            project.tanggal
                                        ).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        {project.lokasi}
                                    </td>
                                    <td className="py-2 px-2 border-b border-gray-200">
                                        <img
                                            src={editIcon}
                                            alt=""
                                            className="cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="py-4 text-center text-gray-500"
                                >
                                    Tidak ada data project
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
