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
            if (data.message) {
                toast.success(data.message);
            } else {
                toast.error("Login gagal.");
            }
            saveUserToLocalStorage(data);

            // Simpan status login di localStorage
            localStorage.setItem("isLoggedIn", true);
            setIsLoggedIn(true);

            setTimeout(() => {
                if (data.karyawan?.role === "admin") {
                    navigate("/");
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
        const toastId = toast.loading("Mohon tunggu sebentar..."); // simpan toast ID
        setIsLoading(true);
        const email = localStorage.getItem("userEmail");

        if (!email) {
            // toast("Email not found in localStorage");
            toast.update(toastId, {
                render: "Email not found in localStorage",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await logoutUser(email);

            // Jika sukses, ambil dan tampilkan pesan
            if (response?.message) {
                // alert(response.message);

                toast.update(toastId, {
                    render: "Berhasil Logout!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            }

            localStorage.clear();
            setIsLoggedIn(false);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            // Tangani error dari API
            let errorMessage = "Terjadi kesalahan saat logout.";

            if (error?.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            toast.update(toastId, {
                render: errorMessage || "Email not found in localStorage",
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoggedIn, isLoading, handleLogin, logout };
}
