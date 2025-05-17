import React, { useState, useEffect } from "react";
import DataTable from "../components/DataTable";
import Navbar from "./../components/Navbar";
import Form from "../components/Form";
import addKaryawan from "../assets/AddKaryawan.svg";
import addProject from "../assets/AddProject.svg";
import karyawanIcon from "../assets/karyawan.svg";
import proyekIcon from "../assets/project.svg";
import { useKaryawan } from "../hooks/useKaryawan";
import { useProject } from "../hooks/useProject";

import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState(() => {
    return localStorage.getItem("adminActiveTab") || "karyawan";
  });
  const navigate = useNavigate();
  const { fetchKaryawanData } = useKaryawan();
  const [karyawanData, setKaryawanData] = useState([]);
  const { fetchProjectData } = useProject();
  const [proyekData, setProjectData] = useState([]);
  const [karyawanCount, setKaryawanCount] = useState(0);
  const [proyekCount, setProjectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  // Fixed fetchProyekData function
  const fetchProyekData = async () => {
    try {
      const data = await fetchProjectData();
      setProjectData(data);
      setProjectCount(data.length || 0);
      return data;
    } catch (err) {
      console.error("Error fetching Project data:", err);
      return [];
    }
  };

  // Get current data based on active component
  const currentData =
    activeComponent === "karyawan" ? karyawanData : proyekData;

  // Create a function to handle tab changes that also updates localStorage
  const handleTabChange = (tab) => {
    setActiveComponent(tab);
    localStorage.setItem("adminActiveTab", tab);
  };

  const refreshData = async () => {
    if (activeComponent === "karyawan") {
      const newData = await fetchKaryawanData();
      setKaryawanData(newData);
      setKaryawanCount(newData?.length || 0);
    } else if (activeComponent === "proyek") {
      const newData = await fetchProyekData();
      setProjectData(newData);
      setProjectCount(newData?.length || 0);
    }
  };

  return (
    <>
      <Navbar />
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
      <div className="flex flex-col items-center justify-center h-screen pt-20">
        <div className="body flex gap-10 w-full h-full bg-amber-400 px-10 pt-10">
          <div className="left-section flex flex-col gap-5 items-center w-1/4 h-full bg-white rounded-t-4xl p-10">
            <p className="text-2xl">Murgung Dashboard</p>
            <ul className="w-full flex flex-col gap-5">
              <li
                className={`w-full flex gap-2 p-3 rounded-lg cursor-pointer transition-all ${
                  activeComponent === "karyawan"
                    ? "bg-gray-200 font-bold"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleTabChange("karyawan")}
              >
                <img src={karyawanIcon} alt="" />
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
                <img src={proyekIcon} alt="" />
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
                      <p className="text-2xl text-amber-400">{karyawanCount}</p>
                    )}
                  </div>
                  <img
                    src={addKaryawan}
                    alt="Add Karyawan"
                    className="w-20 h-20 cursor-pointer"
                    onClick={() => handleShowAddForm("karyawan")}
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
                    onClick={() => handleShowAddForm("proyek")}
                  />
                </>
              )}
            </div>
            <div className="bottom w-full h-4/6 bg-white rounded-3xl p-2 flex flex-col">
              <div className="h-full overflow-hidden">
                <DataTable
                  variant={activeComponent}
                  data={currentData}
                  isLoading={isLoading}
                  refreshData={refreshData}
                  onEdit={(data) => handleShowEditForm(data, activeComponent)}
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
