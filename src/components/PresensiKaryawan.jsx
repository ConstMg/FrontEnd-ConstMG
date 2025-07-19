import React, { use, useEffect, useState } from "react";
import "./../tailwind.css";
import Check from "../assets/check.svg";
import { useNavigate } from "react-router-dom";
import { useKaryawan } from "../hooks/useKaryawan";
import { compressImage } from "../utils/utils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const PresensiKaryawan = () => {
    const name = localStorage.getItem("userName");
    const [description, setDescription] = useState("");

    const [location, setLocation] = useState({ lat: null, lng: null });
    const [submitted, setSubmitted] = useState(false); // NEW
    const [proofFile, setProofFile] = useState(null);
    const navigate = useNavigate();
    const [statusPresensi, setStatusPresensi] = useState("");
    const { handlePresensiMasuk, fetchRiwayatPresensi, loading, error } =
        useKaryawan();
    const [showRiwayat, setShowRiwayat] = useState(false);
    const [dataPresensi, setDataPresensi] = useState([]);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [compressedFile, setCompressedFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Validasi manual sebelum buat FormData
        if (
            (statusPresensi === "Izin" || statusPresensi === "Sakit") &&
            !compressedFile
        ) {
            toast.warn("Mohon unggah bukti izin/sakit anda.");
            return;
        }

        const formData = new FormData();
        formData.append("nama", name);
        formData.append("status_presensi", statusPresensi);
        formData.append("latitude", location.lat);
        formData.append("longitude", location.lng);
        formData.append("deskripsi", description);

        if (compressedFile) {
            formData.append("gambar", compressedFile);
        }

        try {
            const response = await handlePresensiMasuk(formData);
            setMessage(response.message);
            if (response) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Error during presensi:", error);
            // alert("Gagal melakukan presensi. Silakan coba lagi.");
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const compressed = await compressImage(file);
            setCompressedFile(compressed); // simpan file hasil kompres
        } catch (error) {
            console.error("Gagal kompres gambar:", error);
        }
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const userRole = localStorage.getItem("userRole");

        if (!isLoggedIn) {
            navigate("/");
        }
    }, []);

    //Fetch presensi data
    const loadPresensiData = async () => {
        setIsLoading(true);
        try {
            // Use selectedDate which is already initialized with today's date
            const data = await fetchRiwayatPresensi(name);
            setDataPresensi(data);
        } catch (err) {
            console.error("Error fetching presensi data:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Gagal mendapatkan lokasi:", error);
                }
            );
        } else {
            console.error("Geolocation tidak didukung browser.");
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 bg-gray-100">
      
            <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-6xl flex flex-col lg:flex-row gap-6 items-center">
                {/* Map Section */}
                <div className="w-full lg:w-1/2 md:w-7/8 rounded-xl overflow-hidden">
                    {location.lat && location.lng ? (
                        <iframe
                            src={`https://maps.google.com/maps?q=${location.lat},${location.lng}&z=15&output=embed`}
                            width="100%"
                            height="470"
                            allowFullScreen=""
                            loading="lazy"
                            //   style={{ border: 2 }}
                            className="rounded-[30px] overflow-hidden"
                            title="Employee Location"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-[450px] text-gray-500">
                            Memuat peta...
                        </div>
                    )}
                </div>

                {/* Right Section */}
                <div
                    style={{ backgroundColor: "#F3F3F9" }}
                    className="w-full lg:w-1/2 md:w-7/8 p-6 flex flex-col justify-center items-center gap-6 shadow-sm rounded-[30px] overflow-hidden"
                >
                    {/* ✅ Tampilkan form atau tampilan sukses */}
                    {showRiwayat && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="w-3/4 md:h-3/4 bg-white px-6 pb-6 rounded-2xl shadow-lg z-10 overflow-auto h-5/6 relative">
                                <div className="flex justify-between items-center mb-4 sticky top-0 md:left-4 md:right-4 pt-5 bg-white">
                                    <h2 className="text-xl font-semibold text-gray-700">
                                        Riwayat Presensi
                                    </h2>
                                    <button
                                        onClick={() => setShowRiwayat(false)}
                                        className="text-yellow-500 hover:text-yellow-600 cursor-pointer self-start"
                                    >
                                        Kembali
                                    </button>
                                </div>
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div className="mt-6 overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Tanggal
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Jam Masuk
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Jam Keluar
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Lokasi
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {dataPresensi.length > 0 ? (
                                                    dataPresensi.map(
                                                        (item, index) => (
                                                            <tr
                                                                key={index}
                                                                className={
                                                                    index %
                                                                        2 ===
                                                                    0
                                                                        ? "bg-white"
                                                                        : "bg-gray-50"
                                                                }
                                                            >
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    {new Date(
                                                                        item.tanggal
                                                                    ).toLocaleDateString(
                                                                        "id-ID"
                                                                    )}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    {item.jam_masuk ||
                                                                        "-"}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    {item.jam_keluar ||
                                                                        "-"}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    <span
                                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                            item.status_presensi ===
                                                                            "Hadir"
                                                                                ? "bg-green-100 text-green-800"
                                                                                : item.status_presensi ===
                                                                                  "Izin"
                                                                                ? "bg-blue-100 text-blue-800"
                                                                                : item.status_presensi ===
                                                                                  "Sakit"
                                                                                ? "bg-yellow-100 text-yellow-800"
                                                                                : "bg-red-100 text-red-800"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            item.status_presensi
                                                                        }
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                                    {item.latitude &&
                                                                    item.longitude ? (
                                                                        <a
                                                                            href={`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-500 hover:underline"
                                                                        >
                                                                            Cek
                                                                            Lokasi
                                                                        </a>
                                                                    ) : (
                                                                        "-"
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="5"
                                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                                        >
                                                            Tidak ada data
                                                            presensi
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {!submitted ? (
                        <>
                            <div className="flex flex-row justify-between items-center w-full">
                                <h2 className="text-xl font-semibold text-gray-700 self-start">
                                    Information
                                </h2>
                                <p
                                    onClick={() => {
                                        loadPresensiData(name);
                                        setShowRiwayat(true);
                                    }}
                                    className="text-yellow-500 hover:text-yellow-600 cursor-pointer self-start"
                                >
                                    Riwayat
                                </p>
                            </div>

                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                readOnly
                                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <select
                                value={statusPresensi}
                                onChange={(e) =>
                                    setStatusPresensi(e.target.value)
                                }
                                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option value="">Pilih Status</option>
                                <option value="Hadir">Hadir</option>
                                <option value="Izin">Izin</option>
                                <option value="Sakit">Sakit</option>
                                <option value="Alpa">Alpa</option>
                            </select>

                            {(statusPresensi === "Izin" ||
                                statusPresensi === "Sakit") && (
                                <div className="w-full flex flex-col items-start border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400">
                                    <div className="text-sm mb-2 ">
                                        Upload bukti {statusPresensi} dengan format png/jpg/gif
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        onChange={handleFileChange}
                                        required={
                                            statusPresensi === "Izin" ||
                                            statusPresensi === "Sakit"
                                        }
                                        className="w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-md file:border-0
                   file:text-sm file:font-semibold
                   file:bg-yellow-50 file:text-yellow-700
                   hover:file:bg-yellow-100 "
                                    />{" "}
                                </div>
                            )}

                            <input
                                type="text"
                                value={
                                    location.lat && location.lng
                                        ? `${location.lat}, ${location.lng}`
                                        : "📍 Location"
                                }
                                readOnly
                                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-700"
                            />

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                                rows="3"
                                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                            />
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 rounded-md font-semibold transition w-full"
                            >
                                {loading ? "Submitting..." : "Presence"}
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Tampilan Sukses */}
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="text-yellow-500 text-6xl">
                                    <img
                                        src={Check}
                                        alt="Check"
                                        className="w-20 h-20"
                                    />
                                </div>
                                <p className="text-lg font-semibold text-yellow-400">
                                    {message || "Presensi berhasil!"}
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)} // 👈 Kembali ke form
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-6 rounded-md font-semibold transition"
                                >
                                    Back
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PresensiKaryawan;
