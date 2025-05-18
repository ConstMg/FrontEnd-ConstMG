import React, { createContext, useContext } from "react";
import { useProfile as useProfileHook } from "../hooks/useProfile";
import { useImages as useImagesHook } from "../hooks/useImages";

// Inisialisasi context
const Context = createContext();

// Provider
export const Provider = ({ children }) => {
    const profile = useProfileHook(); // hanya dipanggil sekali
    const images = useImagesHook(); // hanya dipanggil sekali

    // Gabungkan profile dan images ke dalam satu objek
    const contextValue = {
        ...profile,
        ...images,
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

// Custom hook untuk mengakses context dengan mudah
export const useCtx = () => {
    return useContext(Context);
};
