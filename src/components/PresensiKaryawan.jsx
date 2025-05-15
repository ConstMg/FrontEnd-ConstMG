import React, { use, useEffect, useState } from "react";
import "./../tailwind.css";
import Check from "../assets/check.svg";
import { useNavigate } from "react-router-dom";
import { useKaryawan } from "../hooks/UseKaryawan";
import { ToastContainer } from "react-toastify";

const PresensiKaryawan = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [submitted, setSubmitted] = useState(false); // NEW
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [statusPresensi, setStatusPresensi] = useState("");
  const { handlePresensiMasuk, loading, error } = useKaryawan();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const latitude = location.lat;
    const longitude = location.lng;
    const status_presensi = statusPresensi;
    const deskripsi = description;
    const nama = name;
    try {
      const response = await handlePresensiMasuk(
        nama,
        status_presensi,
        latitude,
        longitude,
        deskripsi
      );
      setMessage(response.message);
      if (response) {
        // ✅ respons dari API sukses, tampilkan success UI
        setSubmitted(true);
      } // Set submitted to true after successful submission
    } catch (error) {
      console.error("Error during presensi:", error);
      // alert("Gagal melakukan presensi. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");

    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);

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
      {/* <ToastContainer position="bottom-right" autoClose={3000} /> */}
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
          {!submitted ? (
            <>
              <h2 className="text-xl font-semibold text-gray-700 self-start">
                Information
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <select
                value={statusPresensi}
                onChange={(e) => setStatusPresensi(e.target.value)}
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Pilih Status</option>
                <option value="Hadir">Hadir</option>
                <option value="Izin">Izin</option>
                <option value="Sakit">Sakit</option>
                <option value="Alpa">Alpa</option>
              </select>
              {/* <input
                type="date"
                className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                defaultValue={today}
              /> */}
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
                  <img src={Check} alt="Check" className="w-20 h-20" />
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
