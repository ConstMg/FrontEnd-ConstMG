import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import Navbar from "./../components/Navbar";
import addKaryawan from "../assets/addKaryawan.svg";
import addProject from "../assets/addProject.svg";
import { getKaryawan } from "../services/KaryawanServices";

const Admin = () => {
    const [activeComponent, setActiveComponent] = useState("karyawan");
    const [karyawanData, setKaryawanData] = useState([]);
    const [proyekData, setProyekData] = useState([]);
    const [karyawanCount, setKaryawanCount] = useState(0);
    const [proyekCount, setProyekCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch karyawan data
    useEffect(() => {
        const fetchKaryawanData = async () => {
            try {
                setIsLoading(true);
                const response = await getKaryawan();
                const data = Array.isArray(response) ? response : response.data || [];
                setKaryawanData(data);
                setKaryawanCount(data.length);
                setIsLoading(false);
            } catch (err) {
                console.error("Error fetching karyawan data:", err);
                setIsLoading(false);
            }
        };

        fetchKaryawanData();
    }, []);

    // Fetch proyek data when needed
    useEffect(() => {
        if (activeComponent === "proyek") {
            const fetchProyekData = async () => {
                try {
                    setIsLoading(true);
                    // Replace with actual API call when available
                    // const response = await getProyekData();
                    
                    // Mock data for now
                    const mockData = [
                        { id: 1, nama: "Pembangunan Gedung A", tanggal: "2025-05-10", lokasi: "Jakarta" },
                        { id: 2, nama: "Renovasi Kantor", tanggal: "2025-06-15", lokasi: "Bogor" }
                    ];
                    
                    setProyekData(mockData);
                    setProyekCount(mockData.length);
                    setIsLoading(false);
                } catch (err) {
                    console.error("Error fetching proyek data:", err);
                    setIsLoading(false);
                }
            };

            fetchProyekData();
        }
    }, [activeComponent]);

    // Get current data based on active component
    const currentData = activeComponent === "karyawan" ? karyawanData : proyekData;

    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen pt-20">
          <div className="body flex gap-10 w-full h-full bg-amber-400 rounded-t-4xl px-10 pt-10">
            <div className="left-section flex flex-col gap-5 items-center w-1/4 h-full bg-white rounded-t-4xl p-10">
              <p className="text-2xl">Murgung Dashboard</p>
              <ul className="w-full flex flex-col gap-5">
                <li
                  className={`w-full p-3 rounded-lg cursor-pointer transition-all ${
                    activeComponent === "karyawan"
                      ? "bg-amber-400 text-white font-bold"
                      : "hover:bg-amber-100"
                  }`}
                  onClick={() => setActiveComponent("karyawan")}
                >
                  Karyawan
                </li>
                <li
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    activeComponent === "proyek"
                      ? "bg-amber-400 text-white font-bold"
                      : "hover:bg-amber-100"
                  }`}
                  onClick={() => setActiveComponent("proyek")}
                >
                  Proyek
                </li>
              </ul>
            </div>
            <div className="right-section flex flex-col gap-10 w-3/4 h-full">
              <div className="top w-full h-44 bg-white rounded-3xl px-10 flex items-center justify-between">
                {activeComponent === "karyawan" ? (
                  <>
                    <div className="jumlah-karyawan flex flex-col items-center text-xl font-medium">
                      <p>Karyawan</p>
                      {isLoading ? (
                        <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
                      ) : (
                        <p className="text-2xl text-amber-400">
                          {karyawanCount}
                        </p>
                      )}
                      <p>orang</p>
                    </div>
                    <img
                      src={addKaryawan}
                      alt="Add Karyawan"
                      className="w-20 h-20 cursor-pointer"
                      onClick={() => {
                        // Handle add karyawan
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div className="jumlah-karyawan flex flex-col items-center text-xl font-medium">
                      <p>Proyek</p>
                      {isLoading ? (
                        <div className="animate-pulse h-8 w-8 bg-gray-200 rounded-full"></div>
                      ) : (
                        <p className="text-2xl text-amber-400">{proyekCount}</p>
                      )}
                    </div>
                    <img
                      src={addProject}
                      alt="Add Project"
                      className="w-20 h-20 cursor-pointer"
                      onClick={() => {
                        // Handle add project
                      }}
                    />
                  </>
                )}
              </div>
              <div className="bottom w-full h-full bg-white rounded-3xl p-2 flex flex-col">
                <div className="h-full overflow-hidden">
                  <DataTable
                    variant={activeComponent}
                    data={currentData}
                    isLoading={isLoading}
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
