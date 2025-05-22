import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import Navbar from "./../components/Navbar";
import ProjectImages from "../components/ProjectImages";
import Form from "../components/Form";
import karyawanIcon from "../assets/karyawan.svg";
import addingKaryawan from "../assets/addingKaryawan.svg";
import addingProject from "../assets/addingProject.svg";
import proyekIcon from "../assets/project.svg";
import presensiIcon from "../assets/presensi.svg";
import { useKaryawan } from "../hooks/useKaryawan";
import { useProject } from "../hooks/useProject";
import { useNavigate } from "react-router-dom";
import { faSignOutAlt, faHomeAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { getTodayLocalDateString } from "../utils/utils";
library.add(faSignOutAlt, faHomeAlt);

const Admin = () => {
    const [activeComponent, setActiveComponent] = useState(() => {
        return localStorage.getItem("adminActiveTab") || "presensi";
    });
    const navigate = useNavigate();
    const { fetchKaryawanData, fetchPresensiAllKaryawan, fetchPresensiByDate } =
        useKaryawan();
    const { fetchProjectData } = useProject();
    const [karyawanData, setKaryawanData] = useState([]);
    const [proyekData, setProjectData] = useState([]);
    const [karyawanCount, setKaryawanCount] = useState(0);
    const [proyekCount, setProjectCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [presensiData, setPresensiData] = useState([]);
    const [presensiCount, setPresensiCount] = useState(0);

    const [detailPresensiCount, setDetailPresensiCount] = useState({
        hadir: 0,
        izin: 0,
        sakit: 0,
    });
    const [showProjectImages, setShowProjectImages] = useState(false);
    // const getTodayLocalDateString = () => {
    //     const today = new Date(); // Membuat objek Date berdasarkan timezone lokal browser
    //     const year = today.getFullYear();
    //     const month = String(today.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0 (Januari), jadi +1. padStart untuk format '05'
    //     const day = String(today.getDate()).padStart(2, "0"); // padStart untuk format '01'
    //     return `${year}-${month}-${day}`;
    // };
    const [selectedDate, setSelectedDate] = useState(getTodayLocalDateString());

    // Form state management
    const [showForm, setShowForm] = useState(false);
    const [formVariant, setFormVariant] = useState("add");
    const [editingData, setEditingData] = useState(null);
    const [formItemType, setFormItemType] = useState("karyawan");

    // Form handling functions
    const handleShowAddForm = (type) => {
        setFormVariant("add");
        setFormItemType(type);
        setEditingData(null);
        setShowForm(true);
    };

    const handleShowEditForm = (data, type) => {
        setFormVariant("update");
        setFormItemType(type);
        setEditingData(data);
        setShowForm(true);
    };

    const handleFormSubmit = async () => {
        await refreshData();
        setShowForm(false);
        setEditingData(null);
    };

    const handleShowProjectImages = (projectName) => {
        // Seharusnya memanggil setShowProjectImages, dan mungkin perlu data projectName
        setShowProjectImages(true);
    };

    // Fix the function to be synchronous and properly declare variables
    const calculatePresensiCounts = (data) => {
        // Always initialize with default values
        const detail = { hadir: 0, izin: 0, sakit: 0 };

        if (!data || !Array.isArray(data)) {
            return detail;
        }

        data.forEach((element) => {
            if (element.status_presensi === "Hadir") {
                detail.hadir++;
            } else if (element.status_presensi === "Izin") {
                detail.izin++;
            } else if (element.status_presensi === "Sakit") {
                detail.sakit++;
            }
        });

        return detail;
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const userRole = localStorage.getItem("userRole");

        if (!isLoggedIn && userRole !== "admin") {
            navigate("/");
        }
    }, []);

    // Fetch karyawan data
    useEffect(() => {
        const loadKaryawanData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchKaryawanData();
                setKaryawanData(data);
                setKaryawanCount(data.length || 0);
            } catch (err) {
                console.error("Error fetching karyawan data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadKaryawanData();
    }, [fetchKaryawanData]);

    // Fetch project data
    useEffect(() => {
        const loadProjectData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchProjectData();
                setProjectData(data);
                setProjectCount(data.length || 0);
            } catch (err) {
                console.error("Error fetching Project data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadProjectData();
    }, [fetchProjectData]);

    //Fetch presensi data
    useEffect(() => {
        const loadPresensiData = async () => {
            setIsLoading(true);
            try {
                // Use selectedDate which is already initialized with today's date
                const data = await fetchPresensiByDate(selectedDate);
                setPresensiData(data);
                setPresensiCount(data.length || 0);
                const counts = calculatePresensiCounts(data);
                setDetailPresensiCount(counts);
            } catch (err) {
                console.error("Error fetching presensi data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadPresensiData();
    }, [fetchPresensiAllKaryawan]);

    // Get current data based on active component
    const currentData = (() => {
        switch (activeComponent) {
            case "karyawan":
                return karyawanData;
            case "proyek":
                return proyekData;
            case "presensi":
                return presensiData;
            default:
                return [];
        }
    })();

    // Create a function to handle tab changes that also updates localStorage
    const handleTabChange = (tab) => {
        setActiveComponent(tab);
        localStorage.setItem("adminActiveTab", tab);
        // Logika penutupan sidebar akan ditangani di Navbar.jsx
    };

    const refreshData = async () => {
        if (activeComponent === "karyawan") {
            const newData = await fetchKaryawanData();
            setKaryawanData(newData);
            setKaryawanCount(newData?.length || 0);
        } else if (activeComponent === "proyek") {
            const newData = await fetchProjectData();
            setProjectData(newData);
            setProjectCount(newData?.length || 0);
        } else if (activeComponent === "presensi") {
            const newData = await fetchPresensiByDate(selectedDate);
            setPresensiData(newData);
            setPresensiCount(newData?.length || 0);
            const counts = calculatePresensiCounts(newData);
            setDetailPresensiCount(counts);
        }
    };

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        setIsLoading(true);
        try {
            // Fetch presensi data for the selected date
            const data = await fetchPresensiByDate(date);
            setPresensiData(data);
            setPresensiCount(data.length || 0);
            const counts = calculatePresensiCounts(data);
            setDetailPresensiCount(counts);
        } catch (error) {
            console.error(
                "Error fetching presensi data for date:",
                date,
                error
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar
                isAdminPage={true} // Menandakan ini halaman admin
                adminActiveComponent={activeComponent}
                onAdminTabChange={handleTabChange}
                presensiIcon={presensiIcon}
                karyawanIcon={karyawanIcon}
                proyekIcon={proyekIcon}
            />
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Form
                        variant={formVariant}
                        itemType={formItemType}
                        initialData={editingData}
                        onConfirm={handleFormSubmit}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            )}
            {showProjectImages && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <ProjectImages
                        images={proyekData.map((project) => project.imageUrl)}
                        onClose={() => setShowProjectImages(false)}
                    />
                </div>
            )}

            <div className="h-max-dvh flex flex-col items-center justify-center h-screen pt-20">
                <div className="body w-full h-full bg-amber-400 px-4 md:px-10 pt-4 md:pt-10 flex flex-col md:flex-row md:gap-x-6 lg:md:gap-x-10">
                    <div className="hidden md:flex flex-col items-center bg-white md:w-1/4 md:h-full md:rounded-t-4xl md:p-10 md:gap-5">
                        <p className="text-2xl">Murgung Dashboard</p>
                        <ul className="w-full flex flex-col gap-5">
                            <li
                                className={`w-full flex gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                                    activeComponent === "presensi"
                                        ? "bg-gray-200 font-bold"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => handleTabChange("presensi")}
                            >
                                <img
                                    src={presensiIcon}
                                    alt=""
                                    className="w-5"
                                />
                                Presensi
                            </li>
                            <li
                                className={`w-full flex gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                                    activeComponent === "karyawan"
                                        ? "bg-gray-200 font-bold"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => handleTabChange("karyawan")}
                            >
                                <img
                                    src={karyawanIcon}
                                    alt=""
                                    className="w-5"
                                />
                                Karyawan
                            </li>
                            <li
                                className={`w-full flex gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                                    activeComponent === "proyek"
                                        ? "bg-gray-200 font-bold"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => handleTabChange("proyek")}
                            >
                                <img src={proyekIcon} alt="" className="w-5" />
                                Proyek
                            </li>

                            <li className="border-t mt-4 pt-4">
                                <button
                                    onClick={() => navigate("/main")}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-gray-700 hover:bg-gray-100 hover:text-amber-500"
                                >
                                    <FontAwesomeIcon
                                        icon={faHomeAlt}
                                        className="w-5 h-5"
                                    />
                                    Home
                                </button>
                                {/* <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all text-red-600 hover:bg-red-50 hover:font-semibold"
                                >
                                    <FontAwesomeIcon
                                        icon={faSignOutAlt}
                                        className="w-5 h-5"
                                    />
                                    Logout
                                </button> */}
                            </li>
                        </ul>
                    </div>

                    <div className="right-section flex flex-col gap-4 md:gap-10 w-full md:w-3/4 h-full">
                        <div className="top w-full h-1/4 bg-white rounded-3xl px-10 flex items-center justify-between">
                            {activeComponent === "karyawan" ? (
                                <>
                                    <div className="jumlah-karyawan flex flex-col items-center text-xl font-medium">
                                        <p>Total Karyawan</p>
                                        {isLoading ? (
                                            <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
                                        ) : (
                                            <p className="text-2xl text-amber-400">
                                                {karyawanCount}
                                            </p>
                                        )}
                                    </div>
                                    <img
                                        src={addingKaryawan}
                                        alt="Add Karyawan"
                                        className="w-20 h-20 cursor-pointer"
                                        onClick={() =>
                                            handleShowAddForm("karyawan")
                                        }
                                    />
                                </>
                            ) : activeComponent === "proyek" ? (
                                <>
                                    <div className="jumlah-karyawan flex flex-col items-center text-xl font-medium">
                                        <p>Total Proyek</p>
                                        {isLoading ? (
                                            <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
                                        ) : (
                                            <p className="text-2xl text-amber-400">
                                                {proyekCount}
                                            </p>
                                        )}
                                    </div>
                                    <img
                                        src={addingProject}
                                        alt="Add Project"
                                        className="w-20 h-20 cursor-pointer"
                                        onClick={() =>
                                            handleShowAddForm("proyek")
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <div className="jumlah-presensi flex flex-col items-center text-xl font-medium">
                                        <p>Total Presensi</p>
                                        {isLoading ? (
                                            <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
                                        ) : (
                                            <p className="text-2xl text-amber-400">
                                                {presensiCount}/{karyawanCount}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-center text-xl font-medium">
                                        <span className="font-semibold text-green-600">
                                            Hadir
                                        </span>
                                        <span className="text-lg">
                                            {detailPresensiCount.hadir}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center text-xl font-medium">
                                        <span className="font-semibold text-blue-600">
                                            Izin
                                        </span>
                                        <span className="text-lg">
                                            {detailPresensiCount.izin}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center text-xl font-medium">
                                        <span className="font-semibold text-red-600">
                                            Sakit
                                        </span>
                                        <span className="text-lg">
                                            {detailPresensiCount.sakit}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="bottom w-full h-3/4 bg-white rounded-3xl p-2 flex flex-col items-end">
                            {activeComponent === "presensi" && (
                                <div className="mb-4 flex items-center gap-3">
                                    <label
                                        htmlFor="presensi-date"
                                        className="font-medium text-gray-700"
                                    >
                                        Pilih Tanggal:
                                    </label>
                                    <input
                                        type="date"
                                        id="presensi-date"
                                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        value={selectedDate}
                                        onChange={(e) =>
                                            handleDateChange(e.target.value)
                                        }
                                    />
                                </div>
                            )}

                            <div className="h-full w-full overflow-hidden">
                                <DataTable
                                    variant={activeComponent}
                                    data={currentData}
                                    isLoading={isLoading}
                                    refreshData={refreshData}
                                    onEdit={(data) =>
                                        handleShowEditForm(
                                            data,
                                            activeComponent
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
