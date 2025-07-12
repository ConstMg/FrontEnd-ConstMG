//useProfile

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getProfile,
    updateProfile,
    sendEmailHome,
} from "../services/ProfileService";
import { useState, useCallback } from "react";

export function useProfile() {
    const queryClient = useQueryClient();

    // ✅ 1. Fetch data profil pakai useQuery
    const {
        data: profileData,
        isLoading: loading,
        error,
        refetch: refreshProfile,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        staleTime: 10 * 60 * 1000, // cache selama 10 menit
    });

    // ✅ 2. Update data profil pakai useMutation
    const {
        mutateAsync: updateProfileData,
        isPending: updating,
        error: updateError,
        isSuccess: updateSuccess,
        reset: resetUpdateState,
    } = useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            // Update cache setelah berhasil update profil
            queryClient.setQueryData(["profile"], data.data); // asumsi response.data berisi user
        },
    });

    // ✅ 3. Kirim email pakai useMutation (dengan state tambahan)
    const [emailError, setEmailError] = useState(null);
    const [emailSuccess, setEmailSuccess] = useState(false);

    const { mutateAsync: sendContactEmail, isPending: sendingEmail } =
        useMutation({
            mutationFn: async ({ name, from_email, subject, message }) => {
                setEmailError(null);
                setEmailSuccess(false);
                const res = await sendEmailHome(
                    name,
                    from_email,
                    subject,
                    message
                );
                setEmailSuccess(true);
                return res;
            },
            onError: (err) => {
                if (err.response?.data?.message) {
                    setEmailError(err.response.data.message);
                } else {
                    setEmailError(
                        err.message || "Terjadi kesalahan saat mengirim email."
                    );
                }
                setEmailSuccess(false);
            },
        });

    return {
        profileData,
        loading,
        error,
        refreshProfile,
        updateProfileData,
        updating,
        updateError,
        updateSuccess,
        resetUpdateState,
        sendContactEmail,
        sendingEmail,
        emailError,
        emailSuccess,
    };
}
