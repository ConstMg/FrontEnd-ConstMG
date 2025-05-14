// src/hooks/useAuth.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser } from "../services/AuthServices";
import { saveUserToLocalStorage } from "../utils/utils";
import { toast } from "react-toastify";
export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // perlu di sini, bukan dalam login
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(JSON.parse(loggedInStatus) === true);
  }, []);

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);
      // alert(data.message);
      if (data.message) {
        toast.success(data.message);
      } else {
        toast.error("Login gagal.");
      }
      saveUserToLocalStorage(data, email);

      // Simpan status login di localStorage
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);

      setTimeout(() => {
        if (data.karyawan?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/presensi");
        }
      }, 2000);
    } catch (error) {
      // alert(error.message);
      toast.error(error.message || "Terjadi kesalahan saat login.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    const email = localStorage.getItem("userEmail");

    if (!email) {
      alert("Email not found in localStorage");
      setIsLoading(false);
      return;
    }

    try {
      const response = await logoutUser(email);

      // Jika sukses, ambil dan tampilkan pesan
      if (response?.message) {
        alert(response.message);
      } else {
        alert("Logout berhasil.");
      }

      localStorage.clear();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      // Tangani error dari API
      let errorMessage = "Terjadi kesalahan saat logout.";

      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoggedIn, isLoading, handleLogin, logout };
}
