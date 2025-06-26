import { useState, useEffect, useCallback } from "react"; // Tambahkan useCallback
import {
    getProfile,
    updateProfile,
    sendEmailHome, // Pastikan ini diimpor dengan benar dari ProfileService
} from "../services/ProfileService";

export function useProfile() {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [updateMessage, setUpdateMessage] = useState("");

    // State khusus untuk pengiriman email
    const [sendingEmail, setSendingEmail] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [emailSuccess, setEmailSuccess] = useState(false);

    // Fetch profile data
    const fetchProfile = useCallback(async () => {
        // Tambahkan useCallback
        setLoading(true);
        setError(null);
        try {
            const response = await getProfile();
            setProfileData(response);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Gagal mengambil data profil");
        } finally {
            setLoading(false);
        }
    }, []); // Dependensi kosong, karena tidak bergantung pada state/props lain

    // Update profile data
    const updateProfileData = useCallback(async (updatedData) => {
        // Tambahkan useCallback
        setUpdating(true);
        setError(null);
        setUpdateMessage("");
        try {
            console.log(updatedData);
            const response = await updateProfile(updatedData);
            console.log(response);
            setProfileData(response.data); // Asumsi response.data berisi profil yang diperbarui
            setUpdateMessage(response.message || "Profil berhasil diperbarui");
        } catch (err) {
            console.error("Error updating profile:", err);
            const errorMessage = err.message || "Gagal memperbarui profil";
            console.log(errorMessage);
            setError(errorMessage);
            setUpdateMessage(""); // Reset message if error
        } finally {
            setUpdating(false);
        }
    }, []); // Dependensi kosong

    // Fungsi untuk mengirim email kontak
    const sendContactEmail = useCallback(
        async (name, from_email, subject, message) => {
            setSendingEmail(true);
            setEmailError(null);
            setEmailSuccess(false); // Reset success state for new attempt

            try {
                const response = await sendEmailHome(
                    name,
                    from_email,
                    subject,
                    message
                );
                setEmailSuccess(true);
                // Anda bisa mengembalikan respons dari API jika diperlukan di sini
                return response;
            } catch (err) {
                console.error("Error sending contact email:", err);
                // Tangani error secara lebih spesifik dari respons API
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    setEmailError(err.response.data.message); // Ambil pesan error dari respons API
                } else if (err.message) {
                    setEmailError(err.message); // Ambil pesan error standar JavaScript
                } else {
                    setEmailError(
                        "Terjadi kesalahan yang tidak diketahui saat mengirim email."
                    );
                }
                setEmailSuccess(false); // Pastikan success adalah false jika ada error
                throw err; // Re-throw the error to allow caller to handle it if needed
            } finally {
                setSendingEmail(false);
            }
        },
        []
    ); // Dependensi kosong

    // Fetch profile on initial render
    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]); // Tambahkan fetchProfile sebagai dependensi useEffect karena ini useCallback

    return {
        profileData,
        loading,
        error,
        updating,
        updateMessage,
        refreshProfile: fetchProfile,
        updateProfileData,
        // Properti untuk pengiriman email
        sendContactEmail,
        sendingEmail,
        emailError,
        emailSuccess,
    };
}
