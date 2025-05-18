import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/ProfileService";

export function useProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  // Fetch profile data
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProfile();
      setProfileData(response);
    } catch (err) {
      setError("Gagal mengambil data profil");
    } finally {
      setLoading(false);
    }
  };

  // Update profile data
  const updateProfileData = async (updatedData) => {
    setUpdating(true);
    setError(null);
    setUpdateMessage("");
    try {
      const response = await updateProfile(
        updatedData.headline,
        updatedData.main_description,
        updatedData.recent_project_desc,
        updatedData.about_desc,
        updatedData.nama_kantor,
        updatedData.nomor_hp,
        updatedData.email,
        updatedData.website_url
      );
      setProfileData(response.data);
      setUpdateMessage(response.message || "Profil berhasil diperbarui");
    } catch (err) {
      setError("Gagal memperbarui profil");
    } finally {
      setUpdating(false);
    }
  };

  // Fetch profile on initial render
  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profileData,
    loading,
    error,
    updating,
    updateMessage,
    refreshProfile: fetchProfile,
    updateProfileData,
  };
}
